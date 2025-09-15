# ==============================
# assets.js import 경로 vs 실제 파일명 대소문자 비교 & 자동 수정
# ==============================

$assetsFile = "vite-project/src/assets/assets.js"

if (-Not (Test-Path $assetsFile)) {
    Write-Host "❌ assets.js 파일을 찾을 수 없습니다: $assetsFile"
    exit
}

# assets.js에서 import된 파일 경로 추출
$importFiles = Select-String -Path $assetsFile -Pattern 'import .*? from ["'']\./.*?\.(jpg|jpeg|png|svg)["'']' -AllMatches |
    ForEach-Object {
        $_.Matches.Value -replace 'import\s+\w+\s+from\s+["'']\./', '' -replace '["'']', ''
    }

# 실제 src/assets 폴더의 파일 목록 (상대경로)
$assetFiles = Get-ChildItem -Recurse "vite-project/src/assets" -File |
    ForEach-Object {
        $_.FullName.Replace((Resolve-Path "vite-project/src/assets").Path + "\", "").Replace("\", "/")
    }

$caseMismatch = @()

foreach ($import in $importFiles) {
    $importLower = $import.ToLower()
    $matchFile = $assetFiles | Where-Object { $_.ToLower() -eq $importLower }

    if (-not $matchFile) {
        # 대소문자 무시하고 찾기
        $similarFile = $assetFiles | Where-Object { $_.ToLower().EndsWith($importLower) }
        if ($similarFile) {
            $caseMismatch += [PSCustomObject]@{
                ImportPath = $import
                ActualFile = $similarFile
            }
        }
    }
}

if ($caseMismatch.Count -eq 0) {
    Write-Host "✅ 대소문자 불일치 없음"
    exit
}

Write-Host "`n=== 대소문자 불일치 목록 ==="
$caseMismatch | Format-Table

$answer = Read-Host "이 경로들을 자동으로 수정할까요? (y/n)"
if ($answer -eq "y") {
    $content = Get-Content $assetsFile
    foreach ($mismatch in $caseMismatch) {
        $pattern = [regex]::Escape($mismatch.ImportPath)
        $content = $content -replace $pattern, $mismatch.ActualFile
        Write-Host "수정 완료: $($mismatch.ImportPath) → $($mismatch.ActualFile)"
    }
    $content | Set-Content $assetsFile -Encoding UTF8
    git add $assetsFile
    git commit -m "Fix case mismatches in assets.js"
    git push
    Write-Host "=== 모든 수정 완료 & 푸시 완료 ==="
} else {
    Write-Host "수정을 취소했습니다."
}
