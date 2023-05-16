# 45-1st-rgb-backend

member


탁호진 ( github , 회고록 ) 
윤해찬 ( github , 회고록 ) : product manager

----------------------------------

프로젝트 기간 & 인원

프로젝트 기간 2주 ( 2023.04.30 ~ 2023.0514 )

개발인원 
front-end : 이수빈 , 이경진 , 김수정 , 문유현 , 이원준 
back-end : 윤해찬 , 탁호진 

------------------------------------
기술스텍 

백엔드

JavaScript / NodeJS / Mysql 

---------------------------------------

## ⚙️ Collaboration Tool
  
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/trello-008FC7?style=for-the-badge&logo=trello&logoColor=white">
<img src="https://img.shields.io/badge/figma-FF61F6?style=for-the-badge&logo=figma&logoColor=white">
<img src="https://img.shields.io/badge/notion-181717?style=for-the-badge&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
<img src="https://img.shields.io/badge/postman-FF4500?style=for-the-badge&logo=postman&logoColor=white">

- 매일 오전 stand-up meeting에서 trello 툴로 작업 진행상황 및 해결 방안 공유 <br>
- 기획 초반 노션으로 기획의도, 전체적인 컨벤션 정리 <br>
- 피그마를 활용하여 프론트와 api구상을 같이 함
- 슬랙으로 현재 막힌부분, 서로 공유하면 좋은부분등을 공유
- 프론트와 소통하기전 포스트맨으로 먼저 실험해보고, 결과로서 반환되는 값, 입력해야하는 값등을 스크린샷을 찍어서 프론트와 공유

-----------------------------------------

## 💡 About

1. 개발기간: 2023.05.01 ~ 2023.05.12 (총 2주)
2. 프로젝트 목적과 소개
- MZ세대(25~40세)를 타겟으로 매달 초청된 아티스트의 그림과 굿즈를 로테이션으로 판매하는 사이트 개발
- 요즘 세대의 예술 작품에 대한 많은 수요를 배경으로 제품 이미지 중심의 이솝 사이트 레이아웃을 참조하여 rgb 만의 <br>
큐레이팅 아트 사이트를 기획 하였습니다. rgb 는 매달 새로운 아티스트를 선정하여 작품과 굿즈를 한정판으로 판매하며, <br>
그림에 대한 희소성을 부여하고 rgb 의 소비자들은 매달 새로운 아티스트들의 작품과 철학을 즐길 수 있도록 구현하였습니다. <br>

-------------------------------------
## rgb . 에서의 작품 구매 Flow
<br>

> 메인 둘러보기 -> 상품리스트/ 상세페이지 둘러보기 -> 원하는 상품 선택 -> 장바구니 담기 버튼 누름과 동시에 로그인 창 뜸 ->
비회원의 경우 회원가입 하기 -> 원하는 상품 담기 -> 주문/결제하기 -> 인보이스 내역 확인하기

-------------------------------------

##DB 구성
- 1차 프로젝트로써 서로 프로젝트는 처음 하기 때문에, 기본적인 CRUD 기능만 구현하기로함
- cart 테이블은 결제 완료시 삭제되는 테이블로 써 많은 양의 데이터가 필요하지 않아, userid,productid,quantity만 입력
- 

##layerd pattern 적용
- 유지,보수 추후 확장성을 고려하여 layerd pattern 적용
- .env 사용으로 전역변수 설정 및 보안 관련부분 고려

## Login/Sign Up
- 유효성 검사 불만족 시 EMAIL OR PASSWORD INVALID 문구 출력
- 회원가입 시 비밀번호 해쉬화
- 로그인시 입력된 비밀번호와 저장된 해쉬화된 비밀번호 비교 / 확인 시 토큰 발급
- 회원 가입 시 , 토큰을 발급하여, 회원가입 후 따로 로그인 과정이 필요하지 않게 함

## Product List/Detail
#### 판매중인 상품들을 필터 적용하여 사용자의 접근성을 높인 상품리스트/페이지 <br>
- 상품 전체 가져오기 또는 상품디테일 가져오기 옵션
- 상품 불러오기시 category 테이블 참조
- product_images 테이블 따로 관리로 JSONARRAY로 프로덕트 아이디 별 여러 사진 불러오기 가능
- query parameter 지원으로 프론트에서 pagenation 가능
- 상품 갯수 및 재고 테이블에서 관리 (품절시 품절된 부분에 대해 표시 가능)


## Cart
- 장바구니 수량 추가, 상품 리스트 삭제 기능 <br>
- 장바구니 GET, PATCH, DELETE API로 상품 효율적 관리 <br>

## Order/Payment
- transaction 도입
- 재고 수량 확인후, 재고가 있을때만 결제가 가능
- 결제후 유저의 포인트 차감기능
- UUID로 결제 완료후 안전하게 결제번호 저장

## Invoice
- order 테이블로 상품결제 및 상품 정보 또는 수량등 order 정보 불러오기 가능




