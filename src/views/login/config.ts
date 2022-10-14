export const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  // mobile: [
  //   { required: true, message: "请输入手机号" },
  //   {
  //     pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
  //     message: "请输入正确的手机号"
  //   }
  // ],
  // code: [
  //   { required: true, message: "请输入验证码" },
  //   { pattern: /^[0-9]{6}$/, message: "请输入正确的验证码" }
  // ]
  // validcode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
}
