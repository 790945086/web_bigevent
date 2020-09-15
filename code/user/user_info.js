var form = layui.form

form.verify({
    nickname: function (value) {
        if (value.length > 6) {
            return '昵称必须在6-12个字符之间！'
        }
    }
})

//初始化用户的信息
function initUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        data:'',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            console.log(res);
            // 调用form.val()，快速为表单赋值
            form.val('formUserInfo',res.data)
        }
    })
}
initUserInfo()
//重置事件
$('#btnReset').on(function (e) {
    //阻止默认的重置事件
    e.preventDefault()
    initUserInfo()
})

//监听表单提交的事件
$('.layui-form').on("submit", function (e) {
    //阻止默认的重置事件
    e.preventDefault()
    // 发起ajax请求
    $.ajax({
        method: 'post',
        url: '/my/userinfo',
        data:$(this).serialiaze(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更新用户失败！')
            }            
            layer.msg('更新用户成功！')
            // 调用父页面中的方法，重新渲染用户的头像和用户的信息
            window.parent.getUserInfo()
        }

    })
})
