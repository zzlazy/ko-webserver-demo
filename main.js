
// 引入koa
const Koa = require('koa')

// 引入koa-router 解析 get post 请求（请求页面相当于get请求）
const router = require('koa-router')()

// 引入koa-bodyparser 解析 post 请求中的 body（request对象不提供解析body功能）
const bodyparser = require('koa-bodyparser')

// 创建一个koa对象
const api = new Koa()

router.get('/', async (ctx, next) => {
    ctx.response.body = `
        <h1>Hello World!</h1>
        <form action="/sign" method="post">
            <p><label style="width: 110px; display: inline-block">User Name:</label><input name='name'/></p>
            <p><label style="width: 110px; display: inline-block">Password:</label><input type="password" name='psw'/></p>
            <p><input type="submit" value='Login in'/></p>
        </form>
    `    
})

router.post('/sign', async (ctx, next) => {
    console.log(ctx.request.body)
    const name = ctx.request.body.name
    const password = ctx.request.body.psw
    if (password == 'goodlife') {
        ctx.response.body = `
            <h2>Dear ${name}, Login Success</h2>
            <h4>Welcome to my first node server</h4>
            <a href="/">Click Here Back</a>
        `
    } else {
        ctx.response.body = `
            <h2>Dear ${name}</h2>
            <h4>Login Failed!!!</h4>
            <a href="/">Try Again</a>
        `
    }
})

api.use(bodyparser())
api.use(router.routes())

api.listen(3000)