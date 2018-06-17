export const getLuminosity = (rgb) => {
  // for(c in rgb){
  //   c = c / 255.0
  //   c <= 0.03928 ? c = c/12.92 : c = ((c+0.055)/1.055) ^ 2.4
  // }

  return (rgb[0]*0.299 + rgb[1]*0.587 + rgb[2]*0.114)
}

export const hsbToRGB = ($iH, $iS, $iV) => {
  if($iH < 0)   $iH = 0   // Hue:
  if($iH > 360) $iH = 360 // 0-360
  if($iS < 0)   $iS = 0   // Saturation:
  if($iS > 100) $iS = 100 // 0-100
  if($iV < 0)   $iV = 0   // Lightness:
  if($iV > 100) $iV = 100 // 0-100

  let $dS = $iS/100.0     // Saturation: 0.0-1.0
  let $dV = $iV/100.0     // Lightness:  0.0-1.0
  let $dC = $dV*$dS       // Chroma:     0.0-1.0
  let $dH = $iH/60.0      // H-Prime:    0.0-6.0
  let $dT = $dH           // Temp variable

  while($dT >= 2.0) $dT -= 2.0

  let $dX = $dC*(1-Math.abs($dT-1))
  let $dR, $dG, $dB

  switch(Math.floor($dH)) {
    case 0:
      $dR = $dC 
      $dG = $dX 
      $dB = 0.0 
      break
    case 1:
      $dR = $dX 
      $dG = $dC 
      $dB = 0.0 
      break
    case 2:
      $dR = 0.0 
      $dG = $dC 
      $dB = $dX 
      break
    case 3:
      $dR = 0.0 
      $dG = $dX 
      $dB = $dC 
      break
    case 4:
      $dR = $dX 
      $dG = 0.0 
      $dB = $dC 
      break
    case 5:
      $dR = $dC 
      $dG = 0.0 
      $dB = $dX 
      break
    default:
      $dR = 0.0 
      $dG = 0.0 
      $dB = 0.0 
      break
  }

  let $dM = $dV - $dC
  $dR += $dM 
  $dG += $dM 
  $dB += $dM
  $dR *= 255 
  $dG *= 255 
  $dB *= 255

  return Math.round($dR)+","+Math.round($dG)+","+Math.round($dB)
}