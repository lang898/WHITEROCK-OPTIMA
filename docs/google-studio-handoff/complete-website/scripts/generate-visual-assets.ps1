Add-Type -AssemblyName System.Drawing

$Root = Split-Path -Parent $PSScriptRoot
$Assets = Join-Path $Root "assets"

function New-Canvas($Path, $Width, $Height, $Bg) {
  $bmp = [Drawing.Bitmap]::new($Width, $Height)
  $g = [Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $g.Clear([Drawing.ColorTranslator]::FromHtml($Bg))
  return @($bmp, $g)
}

function Save-Jpg($Bitmap, $Path) {
  $Bitmap.Save($Path, [Drawing.Imaging.ImageFormat]::Jpeg)
  $Bitmap.Dispose()
}

function Draw-Veins($g, $w, $h, $count, $color, $alpha) {
  $rand = [Random]::new(42 + $w + $h + $count)
  $pen = [Drawing.Pen]::new([Drawing.Color]::FromArgb($alpha, [Drawing.ColorTranslator]::FromHtml($color)), 3)
  for ($i = 0; $i -lt $count; $i++) {
    $y = $rand.Next(0, $h)
    $points = New-Object Drawing.Point[] 5
    for ($p = 0; $p -lt 5; $p++) {
      $points[$p] = [Drawing.Point]::new([int](($w / 4) * $p), [int]($y + [Math]::Sin($p + $i) * 60 + $rand.Next(-45, 45)))
    }
    $g.DrawCurve($pen, $points)
  }
  $pen.Dispose()
}

function Texture($Path, $Base, $Vein, $Accent, $Label) {
  $w = 1600; $h = 1000
  $pair = New-Canvas $Path $w $h $Base
  $bmp = $pair[0]; $g = $pair[1]
  Draw-Veins $g $w $h 18 $Vein 95
  Draw-Veins $g $w $h 8 $Accent 42
  $brush = [Drawing.SolidBrush]::new([Drawing.Color]::FromArgb(34, [Drawing.ColorTranslator]::FromHtml($Accent)))
  $g.FillRectangle($brush, 0, 0, $w, $h)
  $g.Dispose()
  Save-Jpg $bmp $Path
}

function ProductRender($Path, $Sku, $Kind) {
  $w = 1400; $h = 1000
  $pair = New-Canvas $Path $w $h "#f4f1eb"
  $bmp = $pair[0]; $g = $pair[1]
  Draw-Veins $g $w $h 12 "#9f9a92" 56
  $shadow = [Drawing.SolidBrush]::new([Drawing.Color]::FromArgb(35, 0, 0, 0))
  $stone = [Drawing.SolidBrush]::new([Drawing.ColorTranslator]::FromHtml("#f8f8f6"))
  $edge = [Drawing.Pen]::new([Drawing.ColorTranslator]::FromHtml("#d8d2c7"), 5)
  $accent = [Drawing.Pen]::new([Drawing.ColorTranslator]::FromHtml("#b6b1a8"), 3)

  if ($Kind -like "*Furniture*") {
    $g.FillEllipse($shadow, 370, 690, 660, 88)
    $g.FillEllipse($stone, 330, 245, 720, 410)
    $g.DrawEllipse($edge, 330, 245, 720, 410)
    $g.DrawLine($accent, 690, 650, 690, 770)
    $g.DrawLine($accent, 550, 635, 500, 742)
    $g.DrawLine($accent, 830, 635, 880, 742)
  } elseif ($Kind -like "*Countertop*" -or $Kind -like "*Backsplash*" -or $Sku -eq "WR-SM") {
    $g.FillEllipse($shadow, 230, 705, 950, 82)
    $poly = [Drawing.Point[]]@(
      [Drawing.Point]::new(230, 310), [Drawing.Point]::new(1110, 250),
      [Drawing.Point]::new(1210, 610), [Drawing.Point]::new(315, 690)
    )
    $g.FillPolygon($stone, $poly)
    $g.DrawPolygon($edge, $poly)
    $g.DrawLine($accent, 360, 430, 980, 385)
  } else {
    $g.FillEllipse($shadow, 265, 705, 860, 82)
    $poly = [Drawing.Point[]]@(
      [Drawing.Point]::new(245, 330), [Drawing.Point]::new(1115, 300),
      [Drawing.Point]::new(1190, 620), [Drawing.Point]::new(320, 690)
    )
    $g.FillPolygon($stone, $poly)
    $g.DrawPolygon($edge, $poly)
    $sink = [Drawing.Rectangle]::new(570, 410, 290, 180)
    $g.FillEllipse([Drawing.SolidBrush]::new([Drawing.ColorTranslator]::FromHtml("#e8e6e1")), $sink)
    $g.DrawEllipse($accent, $sink)
    $g.FillEllipse([Drawing.SolidBrush]::new([Drawing.ColorTranslator]::FromHtml("#c9c2b8")), 704, 492, 24, 24)
  }

  $g.Dispose()
  Save-Jpg $bmp $Path
}

Texture (Join-Path $Assets "brand\hero-stone.jpg") "#3a3a36" "#f4f1eb" "#a86f3d" "Hero"
Texture (Join-Path $Assets "brand\og-image.jpg") "#f8f5ef" "#b5afa5" "#2f5f58" "OG"
Texture (Join-Path $Assets "materials\white-marble-texture.jpg") "#f8f8f4" "#9f9a92" "#dedbd4" "Marble"
Texture (Join-Path $Assets "materials\granite-texture.jpg") "#b8b4ad" "#3b3a37" "#2f5f58" "Granite"
Texture (Join-Path $Assets "materials\quartz-texture.jpg") "#f4f0e8" "#b78958" "#a86f3d" "Quartz"
Texture (Join-Path $Assets "materials\engineered-marble-texture.jpg") "#eee9e0" "#8f8b84" "#5a5c61" "Engineered"

$catalog = Get-Content (Join-Path $Root "data\products.json") | ConvertFrom-Json
$products = if ($catalog.products) { $catalog.products } else { $catalog }
foreach ($p in $products) {
  ProductRender (Join-Path $Root $p.image) $p.sku $p.category
}
