export type AuthorizationOptions = {
  client_id?: string // 앱 REST API 키
  redirect_uri?: string // 인가 코드를 전달받을 서비스 서버의 URI
  response_type?: string // 'code'로 고정
  scope?: string // 추가 항목 동의 받기 요청 시 사용, 쉼표(,)로 구분해 여러 개 전달 가능
  prompt?: string // 동의 화면 요청 시 추가 상호작용을 요청할 때 사용, 쉼표(,)로 구분된 문자열 값 목록으로 전달
  login_hint?: string // 로그인 힌트 주기 요청 시 사용, 카카오계정 로그인 페이지의 ID란에 자동 입력할 값
  service_terms?: string // 서비스 약관 선택해 동의 받기 요청 시 사용, 쉼표(,)로 구분된 문자열 값 목록으로 전달
  state?: string // 카카오 로그인 과정 중 동일한 값을 유지하는 임의의 문자열(정해진 형식 없음)
  nonce?: string // OpenID Connect를 통해 ID 토큰을 함께 발급받을 경우 사용
}
