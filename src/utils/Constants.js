export default class Constants {
  static API = {
    TEST_API: '/todos',
    MSERVICE_API: '/service/getAllService',
    GET_CONTRACT_LIST_API: '/contract/getContractList',
    POST_CONTRACT_API: '/contract/createContract',
    GET_CONTRACT_API: '/contract/getContract',
    PUT_CONTRACT_API: '/contract/updateContract',
    GET_ADMIN_CONTRACT_API: '/admin/getContract',
    PUT_ADMIN_CONTRACT_API: '/contract/updateContractAdmin',
    GET_CONTRACT_USAGE_STATUS_API: '/contract/getUsageStatus',
    GET_SERVICE_BY_USER_API: '/service/getServiceByUser',
    GET_GROUP_BY_CONTRACT_API: '/group/getGroupByContractId',
    ADMIN_GET_GROUP_BY_CONTRACT_API: '/group/adminGetGroupByContractId',
    PUT_GROUP_API: '/group/updateGroup',
    DELETE_GROUP_API: '/group/deleteGroup',
    GET_MEMBER_BY_GROUP_API: '/member/getMemberByGroup',
    DELETE_MEMBER_API: '/member/deleteMember',
    GET_OPERATOR_LIST_API: '/operator/getOperatorList',
    POST_OPERATOR_API: '/operator/createOperator',
    POST_GROUP_API: '/group/createGroup',
    POST_MEMBER_API: '/member/inviteMembers',
    DELETE_OPERATOR_API: '/operator/deleteOperator',
    MPROVIDER_API: '/operator/getMproviderId',
    POST_ADMIN_INVITE_MEMBER_API: '/member/adminInviteMembers',
    POST_ADMIN_GROUP_API: '/group/adminCreateGroup',
    GET_CHECK_ACTIVE_SERVICE_API: '/service/checkActiveService',
    GET_PLAN_API: '/plan/getPlan',
    GET_PLAN_HISTORY_API: '/plan/getListPlanHistory',
  }
  static AUTH_API = {
    CHECK_LOGIN: 'auth/checkLogin',
  }

  static EMAIL_REG =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  static STATUS_MESS = {
    USER_NOT_EXIST: '指定されたユーザが存在していません。',
    SESSION_NOT_EXIST:
      'セッションタイムアウトが発生しました。 ログインから再度実行してください。',
    INCORRECT_USER:
      'ログイン情報が正しくなりません。ロックされるまでのログイン試行失敗回数：{XX}',
    LOCK_USER:
      'アカウントがロックされているため、ログインできません。{XX}秒以上経過した後に再度ログインを行ってください。',
    USER_INACTIVE: 'あなたのアカウントは有効になっていません。',
    USER_SUSPENDED: 'あなたのアカウントは停止されました。',
  }
}
