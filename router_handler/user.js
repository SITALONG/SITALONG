//导入数据库模块
const db =require('../db/index')
//导入加密包
const bcrypt = require('bcryptjs')

exports.regUser = (req, res) => {
    //获取表达患者信息
    const userinfo = req.body
    //console.log(userinfo);
    if(!userinfo.username || !userinfo.password){
        return res.send({status:1,message:'用户名或者密码不合法！'})
    }
    //定义sql语句
    const sqlStr='select * from ev_users where username=?'

    db.query(sql, [userinfo.username], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
         // return res.send({ status: 1, message: err.message })
         return res.cc(err)
        }
        // 用户名被占用
        if (results.length > 0) {
          //return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
          return res.cc('用户名被占用，请更换其他用户名！')
        }
        // TODO: 用户名可用，继续后续流程...
       userinfo.password= bcrypt.hashSync(userinfo.password,10)
       //插入数据
       const sql = 'insert into ev_users set ?'

       db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message })
        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
          return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
        }
        // 注册成功
        res.send({ status: 0, message: '注册成功！' })
      })

      })


   // res.send('reguser OK')
  }
  
  // 登录的处理函数
  exports.login = (req, res) => {
    res.send('login OK')
  }