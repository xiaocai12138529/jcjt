import { Rules } from '@/views/validate'
export const columData = [
    {prop:"name",label:"线路名称",align:"center"},
    {prop:"startMileage",label:"起点里程",align:"center"},
    {prop:"endMileage",label:"终点里程",align:"center"},
    {prop:"remark",label:"备注"}
]
export var formItems =[
    {type:"input",label:"线路名称",prop:"name",placeholder:"请输入",rules:Rules.Text(true)},
    {type:"number",label:"起点里程",prop:"startMileage",placeholder:"请输入",appendname:"公里"},
    {type:"number",label:"终点里程",prop:"endMileage",placeholder:"请输入",appendname:"公里"},
    {type:"textarea",label:"备注",prop:"remark",placeholder:"请输入"}
]