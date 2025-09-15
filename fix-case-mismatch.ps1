# ==============================
# Netlify 빌드 오류 원인: 파일명 대소문자 불일치 자동 수정 스크립트
# 작성자: Kai 전용
# ==============================

Write-Host "=== 1. 백업 브랜치 생성 ==="
$backupBranch = "backup-before-case-fix"
git checkout -b $backupBranch
git push origin $backupBranch

Write-Host "=== 2. main 브랜치로 복귀 & 최신 동기화 ==="
git checkout main
git pull origin main

Write-Host "=== 3. Git 이미지 파일 목록 수집 ==="
$gitFiles = git ls-files | Where-Object { $_ -match "\.(jpg|jpeg|png|svg)$" }

Write-Host "=== 4. 코드 import 경로 수집 ==="
$importFiles = Select-String -Path "src\**\*.js" -Pattern "import .*?\.(jpg|jpeg|png|svg)" -AllMatches |
    ForEach-Object {
        $_.Matches.Value -replace 'import\s+\w+\s+from\s+[\"'']\.\/', '' -replace '[\"'']', ''
    }

$lowerGitFiles = $gitFiles | ForEach-Object { $_.ToLower() }
$caseMismatch = @()

foreach ($import in $importFiles) {
    $importLower = $import.ToLower()
    if ($lowerGitFiles -contains $importLower) {
        $actualName = $gitFiles | Where-Object { $_.ToLower() -eq $importLower }
        if ($actualName -ne $import) {
            $caseMismatch += [PSCustomObject]@{
                ImportPath = $import
                ActualFile = $actualName
            }
        }
    }
}

Write-Host "`n=== 대소문자 불일치 목록 ==="
if ($caseMismatch.Count -eq 0) {
    Write-Host "대소문자 불일치 없음. 수정할 필요 없습니다."
    exit
}

$caseMismatch | Format-Table

$answer = Read-Host "대소문자 불일치를 자동으로 수정할까요? (y/n)"
if ($answer -eq "y") {
    foreach ($mismatch in $caseMismatch) {
        $tempName = "$($mismatch.ActualFile).temp"
        git mv $mismatch.ActualFile $tempName
        git mv $tempName $mismatch.ImportPath
        Write-Host "수정 완료: $($mismatch.ActualFile) → $($mismatch.ImportPath)"
    }
    git commit -m "Fix filename case mismatches for Netlify"
    git push
    Write-Host "=== 모든 수정 완료 & 푸시 완료 ==="
} else {
    Write-Host "수정을 취소했습니다."
}
