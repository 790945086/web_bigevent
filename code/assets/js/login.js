// 点击去注册
$('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
})
// 点击去登录
$('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
})
//从layui 中获取 form对象
var form = layui.form
var layer = layui.layer
//通过form.verify（）函数自定义校验规则
form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function(value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })
//监听注册表单的提交事件
$('#form_reg').on('submit', function (e) {
    //阻止默认行为
    e.preventDefault()
    //发起ajax请求
    $.ajax({
        type: 'post',
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                layer.msg('注册失败！')
            }
            layer.msg('注册成功！请登录')
            //调用一下去登陆按钮点击事件
            $('#link_login').click()
        }
    })
})
//监听登录表单的提交事件
$('#form-login').submit(function (e) {
    e.preventDefault()
    $.ajax({
        type: 'post',
        url: '/api/login',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
              return   layer.msg('登录失败！')
            }
            layer.msg(res.message)
            //将登录成功获取的token字符串本地储存
            localStorage.setItem('token',res.token)
            //登录成功跳转到首页
            location='index.html'

        }
    })
})
// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})
