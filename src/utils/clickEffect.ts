export const clickEffect = () => {
  const balls: any[] = []
  let longPressed = false
  let longPress: string | number | NodeJS.Timeout | undefined
  let multiplier = 0
  let width: number, height: number
  let origin: { x: any; y: any }
  let normal: { x: any; y: any }
  let ctx: any
  const colours = ['#A76AAE', '#E7C996', '#ECECD0', '#FF7F9D', '#FF8C9F', '#FFB07F']

  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  canvas.setAttribute(
    'style',
    'width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;'
  )
  const pointer = document.createElement('span')
  pointer.classList.add('pointer')
  document.body.appendChild(pointer)

  const updateSize = () => {
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'
    ctx.scale(2, 2)
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
    origin = {
      x: width / 2,
      y: height / 2
    }
    normal = {
      x: width / 2,
      y: height / 2
    }
  }
  class Ball {
    [x: string]: any
    constructor(x = origin.x, y = origin.y) {
      this.x = x
      this.y = y
      this.angle = Math.PI * 2 * Math.random()
      if (longPressed == true) {
        this.multiplier = randBetween(14 + multiplier, 15 + multiplier)
      } else {
        this.multiplier = randBetween(6, 12)
      }
      this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle)
      this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle)
      this.r = randBetween(8, 12) + 3 * Math.random()
      this.color = colours[Math.floor(Math.random() * colours.length)]
    }
    update() {
      this.x += this.vx - normal.x
      this.y += this.vy - normal.y
      normal.x = (-2 / window.innerWidth) * Math.sin(this.angle)
      normal.y = (-2 / window.innerHeight) * Math.cos(this.angle)
      this.r -= 0.3
      this.vx *= 0.9
      this.vy *= 0.9
    }
  }

  const pushBalls = (count = 1, x = origin.x, y = origin.y) => {
    for (let i = 0; i < count; i++) {
      balls.push(new Ball(x, y))
    }
  }

  const randBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * max) + min
  }

  const loop = () => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0)'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < balls.length; i++) {
      const b = balls[i]
      if (b.r < 0) continue
      ctx.fillStyle = b.color
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false)
      ctx.fill()
      b.update()
    }
    if (longPressed == true) {
      multiplier += 0.2
    } else if (!longPressed && multiplier >= 0) {
      multiplier -= 0.4
    }
    removeBall()
    requestAnimationFrame(loop)
  }

  const removeBall = () => {
    for (let i = 0; i < balls.length; i++) {
      const b = balls[i]
      if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
        balls.splice(i, 1)
      }
    }
  }

  if (canvas.getContext && window.addEventListener) {
    ctx = canvas.getContext('2d')
    updateSize()
    window.addEventListener('resize', updateSize, false)
    loop()
    window.addEventListener(
      'mousedown',
      e => {
        pushBalls(randBetween(10, 20), e.clientX, e.clientY)
        document.body.classList.add('is-pressed')
        longPress = setTimeout(() => {
          document.body.classList.add('is-longpress')
          longPressed = true
        }, 500)
      },
      false
    )
    window.addEventListener(
      'mouseup',
      e => {
        clearInterval(longPress)
        if (longPressed == true) {
          document.body.classList.remove('is-longpress')
          pushBalls(
            randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)),
            e.clientX,
            e.clientY
          )
          longPressed = false
        }
        document.body.classList.remove('is-pressed')
      },
      false
    )
    window.addEventListener(
      'mousemove',
      e => {
        const x = e.clientX
        const y = e.clientY
        pointer.style.top = y + 'px'
        pointer.style.left = x + 'px'
      },
      false
    )
  } else {
    console.log('canvas or addEventListener is unsupported!')
  }
}
