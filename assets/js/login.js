$(function() {
    $('#link_reg').on('click',function() {
        $('.reg-box').show();
        $('.login-box').hide()
    })
    $('#link_login').on('click',function() {
        $('.reg-box').hide();
        $('.login-box').show()
    })
    var form = layui.form;
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须是6到12位，且不能出现空格'],
        repwd:function(value) {
           var pwd = $('.reg-box [name="password"]').val();
           if(pwd !== value) {
               return '两次密码不一样';
           }
        }
    });
    $('#form_reg').on('submit',function(e) {
              e.preventDefault();
              $.ajax({
                  method: 'POST',
                   url: '/api/reguser',
                   data:{ username:$('#form_reg [name=username]').val(),
                          password:$('#form_reg [name=password]').val()
                    },
                    success:function(reg) {
                        if(reg.status !== 0) {
                            return layer.msg(reg.message)
                        }
                        layer.msg('注册成功，请登录!')
                        $('#link_login').click()
                    }
              })
          })
          $('#form_login').submit(function(e) {
            e.preventDefault()
            $.ajax({
              url: '/api/login',
              method: 'POST',
              // 快速获取表单中的数据
              data: $(this).serialize(), 
              success: function(res) {
                if (res.status !== 0) {
                  return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '../../index2.html'
              }
            })
        })
    //  var form = layui.form;
    //  var layer = layer.layer;
    // form.verify({
    //     pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //     repwd: function(value) {
    //       var pwd = $('.reg-box [name=password]').val()
    //       if (pwd !== value) {
    //         return '两次密码不一致！'
    //       }
    //     }
    //   });
    //   $('.#form_reg').on('submit',function(e) {
    //       e.preventDefaule;
    //       $.ajax({
    //           type: 'POST',
    //            url: 'http://ajax.frontend.itheima.net/api/reguser',
    //            data:
    //       })
    //   })
})