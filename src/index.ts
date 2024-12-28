import express, { json, urlencoded } from 'express'
import ProductRoutes from './routes/ProductRoutes.js'
import UserRoutes from './routes/UserRoutes.js'
import OrderRoutes from './routes/OrderRoutes.js'

import serverless from 'serverless-http';
const app=express()
const port=3000

app.get('/',(req,res)=>{
    res.send('hello worldddddd')
})
app.use(urlencoded({extended:false}))
app.use(json())
app.use('/products',ProductRoutes)
app.use('/auth',UserRoutes)
app.use('/orders',OrderRoutes)
if (process.env.NODE_ENV === "dev") {
app.listen(port,()=>{
    console.log(`serever is listening to port ${port}`);
    
})
}

export const handler = serverless(app);