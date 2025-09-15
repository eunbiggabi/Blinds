# ==============================
# assets.js import 경로 vs 실제 파일 존재 여부 검사
# ==============================

$assetsFile = "vite-project/src/assets/assets.js"

if (-Not (Test-Path $assetsFile)) {
    Write-Host "ERROR: assets.js file not found: $assetsFile"
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

$missingFiles = @()
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
        } else {
            $missingFiles += $import
        }
    }
}

Write-Host "`n=== Missing files in Git ==="
if ($missingFiles.Count -eq 0) {
    Write-Host "None ✅"
} else {
    $missingFiles | ForEach-Object { Write-Host "❌ $_" }
}

Write-Host "`n=== Case mismatch files ==="
if ($caseMismatch.Count -eq 0) {
    Write-Host "None ✅"
} else {
    $caseMismatch | Format-Table
}
