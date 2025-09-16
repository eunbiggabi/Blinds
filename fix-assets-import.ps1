# ==============================
# assets.js import 경로 자동 수정 스크립트
# ==============================

$assetsFile = "vite-project/src/assets/assets.js"

if (-Not (Test-Path $assetsFile)) {
    Write-Host "❌ assets.js 파일을 찾을 수 없습니다: $assetsFile"
    exit
}

# assets.js 내용 읽기
$content = Get-Content $assetsFile

# src/assets 폴더의 실제 파일 목록 (상대경로)
$assetFiles = Get-ChildItem -Recurse "vite-project/src/assets" -File |
    ForEach-Object {
        $_.FullName.Replace((Resolve-Path "vite-project/src/assets").Path + "\", "").Replace("\", "/")
    }

$updatedContent = @()

foreach ($line in $content) {
    if ($line -match 'import\s+\w+\s+from\s+[\"'']\./(.+\.(jpg|jpeg|png|svg))[\"'']') {
        $importPath = $matches[1]

        # 실제 파일 목록에서 소문자 비교로 매칭
        $matchFile = $assetFiles | Where-Object { $_.ToLower().EndsWith($importPath.ToLower()) }

        if ($matchFile) {
            # 경로를 실제 파일명으로 교체
            $correctPath = "./" + $matchFile
            $newLine = $line -replace [regex]::Escape($importPath), $matchFile
            $updatedContent += $newLine
            Write-Host "✅ 수정: $importPath → $matchFile"
        }
        else {
            $updatedContent += $line
            Write-Host "⚠️ 경로 확인 필요: $importPath (파일 없음)"
        }
    }
    else {
        $updatedContent += $line
    }
}

# 수정된 내용 저장
$updatedContent | Set-Content $assetsFile -Encoding UTF8

Write-Host "`n=== assets.js 경로 수정 완료 ==="
