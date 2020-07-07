// Followed this guide:
// https://www.inserthtml.com/2013/08/exploding-blocks-css-and-javascript/

const rand = (min, max) => {
  return Math.random() * (max - min) + min;
}
		
const handleExplosion = (divId) => {
  const child = document.getElementById(divId)
  const parent = child.parentElement

  const genClips = () => {
    const amount = 5

    // tack on some additional width to cover the borders
    const width = (child.clientWidth + 50) / amount
    const height = (child.clientHeight + 50) / amount
    const totalSquares = amount * amount

    let html = child.innerHTML
    let finalHtml = ""

    let y = 0
    for (let z = 0; z <= (amount * width); z = z + width) {
      finalHtml += `<div class="clipped" style="clip: rect(${y}px, ${z + width}px, ${y + height}px, ${z}px)">${html}</div>`
      const div = document.createElement('div')
      div.className = 'clipped'
      div.innerHTML = html
      const childStyles = window.getComputedStyle(child)

      const newStyles = {
        clip: `rect(${y}px, ${z + width}px, ${y + height}px, ${z}px)`,
        position: 'fixed',
        bottom: childStyles.bottom,
        left: childStyles.left,
        width: childStyles.width,
        height: childStyles.height,
        margin: childStyles.margin,
        padding: childStyles.padding,
        ['background-color']: childStyles['background-color'],
        border: childStyles.border,
      }
      if (divId === "footer") {
        newStyles.bottom = 0
        newStyles.left = 0
      }
      if (divId === 'navbar') {
        newStyles.bottom = document.querySelector('body').clientHeight - 56
        newStyles.left = 0
      }
      Object.assign(div.style, newStyles)
      parent.append(div)
      
      if (z === (amount * width) - width) {
        y = y + height
        z = -width
      }
      if (y === (amount*height)) z = 9999999
    }
    parent.removeChild(child)
  }

  const explode = () => {
    parent.querySelectorAll('.clipped').forEach(element => {
      const initialBot = parseFloat(window.getComputedStyle(element).bottom)
      const initialLeft = parseFloat(window.getComputedStyle(element).left)
      
      const velocity = Math.floor(rand(85,110))
      const angle = Math.floor(rand(80, 89))
      const theta = (angle * Math.PI) / 180 // Theta is the angle in radians
      const gravityConst = -6.5

      // time is initially zero
      let time = 0
      // higher than the total time for the projectile motion because we want the squares to go off screen.
      const totalTime = 20
      let interval, r, nx, ny

      // The direction can either be left (1), right (-1) or center (0). This is the horizontal direction
      const negate = [1, -1, 0]
      const direction = negate[ Math.floor(Math.random() * negate.length) ];

      // Some random numbers for altering the shapes position
      const randDeg = rand(-5, 10)
      const randScale = rand(0.9, 1.1)
      const randDeg2 = rand(-15, 15)

      element.style['transform'] = 'scale('+randScale+') skew('+randDeg+'deg) rotateZ('+randDeg2+'deg)'

      interval = setInterval(() => {
        // Horizontal speed is constant (no wind resistance on the internet)
        const ux = ( Math.cos(theta) * velocity ) * direction;					
        // Vertical speed decreases as time increases before reaching 0 at its peak
        const uy = ( Math.sin(theta) * velocity ) - ( (-gravityConst) * time);

        // The horizontal position
        nx = initialLeft + (ux * time)
        ny = initialBot + ((uy * time) + (0.5 * (gravityConst) * Math.pow(time, 2)))

        element.style['bottom'] = (ny) + 'px'
        element.style['left'] = (nx) + 'px'

        time = time + 0.10

        if (time > totalTime) {
          element.remove()

          clearInterval(interval)
        }
      }, 10)
    })
  }

  genClips()
  explode()
}

const explodeAll = () => {
  const divs = ["feedback-container", "footer", "centerpiece", "navbar"]
  handleExplosion(divs[0])
  setTimeout(() => handleExplosion(divs[1]), 3000)
  setTimeout(() => handleExplosion(divs[2]), 6000)
  setTimeout(() => handleExplosion(divs[3]), 9000)
}

export default explodeAll