export const err_msg = {
  Required: '该选项为必选项！',
  Text_Empty: '请输入内容（不能为空或全为空格）',
  Text_Exceed_Max_Length: '文本长度超过限制(1~{0})',
  Email_Illegal: '邮箱格式不正确',
  Number_Phone: '请输入正确手机号码',
  Number_NaN: '请输入正确数字',
  Number_Exceed_Max_Length: '数字超过限制:接收范围({0}~{1})',
  Password:
    '密码长度不小于10位且最少包含大写字母、小写字母、数字及特殊符号中三种',
}
String.prototype.format = function () {
  var formatted = this
  for (var arg in arguments) {
    formatted = formatted.replace('{' + arg + '}', arguments[arg])
  }
  return formatted
}

export class Rules {
  static Require = [
    {
      required: true,
      message: err_msg.Required,
      trigger: 'blur',
    },
  ]
  static Text = (r = false, maxLength = 50) => {
    let rule = []
    if (r) {
      rule.push({
        required: true,
        message: err_msg.Text_Empty,
        trigger: 'blur',
      })
    }
    rule.push({
      min: r ? 1 : 0,
      max: maxLength,
      message: err_msg.Text_Exceed_Max_Length.format(maxLength),
      trigger: 'blur',
    })
    rule.push({
      validator: (rule, value, callback) => {
        var flag = new RegExp("[<%'! ]")
        if (flag.test(value)) {
          callback(new Error("不能包含特殊字符 <%'! 和空格"))
        }
        callback()
      },
      trigger: 'blur',
    })
    return rule
  }
  static Password = () => {
    const PASSWORD_CHECK_REGEXP = new RegExp(
      '(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{10,30}'
    )
    return [
      {
        validator: (rule, value, callback) => {
          if (!value) {
            return callback()
          }
          if (PASSWORD_CHECK_REGEXP.test(value)) {
            return callback()
          } else {
            return callback(new Error(err_msg.Password))
          }
        },
        trigger: 'blur',
      },
    ]
  }
  static Email = () => {
    return [
      {
        validator: (rule, value, callback) => {
          if (!value) {
            return callback()
          }
          if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return callback()
          } else {
            return callback(new Error(err_msg.Email_Illegal))
          }
        },
        trigger: 'blur',
      },
    ]
  }
  static Number = (r = false,min = -Infinity, max = Infinity) => {
    let rule = [
      { 
        validator: (rule, value, callback) => {
          if (!value) return callback()
          
          if (new RegExp('[ ]').test(value) || Number.isNaN(Number(value))) {
            return callback(err_msg.Number_NaN)
          } else if (value < min || value > max) {
            return callback(err_msg.Number_Exceed_Max_Length.format(min, max))
          }
          return callback()
        },

        trigger: 'blur',
      },
    ]
    if (r) {
      rule.push({
        required: true,
        message: err_msg.Text_Empty,
        trigger: 'blur',
      })
    }

    return rule
  }
  static Mileage = () => this.Number(0, 99999999)
  static PhoneNumber = () => {
    return [
      {
        validator: (rule, value, callback) => {
          if (value === '') return callback()
          var phonenoRegex = /^1\d{10}$/
          if (value.match(phonenoRegex)) {
            return callback()
          } else {
            return callback(err_msg.Number_Phone)
          }
        },
      },
    ]
  }
}

export class Validate {
  static TextLength = (maxLength) =>
    function (rule, value, callback) {
      console.log(value)
      if (!value) {
        console.log(1)
        return callback(new Error(err_msg.Text_Empty))
      }
      setTimeout(() => {
        if (value.length > maxLength) {
          console.log(2)
          return callback(
            new Error(err_msg.Text_Exceed_Max_Length.format(maxLength))
          )
        }
      }, 1000)
      callback()
    }
}
