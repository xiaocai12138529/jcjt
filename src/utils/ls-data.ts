import { computed, Ref, h, Component } from 'vue'
export const columns = [
  {
    title: '序号',
    index: 'index',
    width: 80,
    customRender: ({ index }: any) => index + 1,
    align: 'center',
  },
  {
    title: '成果名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    customCell: () => ({
      style: {
        color: '#FCCA00',
      },
    }),
  },
  {
    title: '坐标系统',
    dataIndex: 'zbxt',
    key: 'zbxt',
    align: 'center',
  },
  {
    title: '中央子午线',
    dataIndex: 'zyzwx',
    key: 'zyzwx',
    align: 'center',
  },
  {
    title: '投影面大地高',
    key: 'tymddg',
    dataIndex: 'tymddg',
    align: 'center',
  },
  {
    title: '高程异常',
    key: 'gcyc',
    dataIndex: 'gcyc',
    align: 'center',
  },
  {
    title: '测量单位',
    key: 'cldw',
    dataIndex: 'cldw',
    align: 'center',
  },
  {
    title: '作业负责人',
    key: 'zyfzr',
    dataIndex: 'zyfzr',
    align: 'center',
  },
  {
    title: '作业时间',
    key: 'zysj',
    dataIndex: 'zysj',
    align: 'center',
  },
  {
    title: '作业里程',
    key: 'zylc',
    dataIndex: 'zylc',
    align: 'center',
  },
]

export const data: any = [
  {
    name: '',
    zbxt: '',
    zyzwx: '',
    tymddg: '',
    gcyc: '',
    cldw: '',
    zyfzr: '',
    zysj: '',
    zylc: '',
  },
]
