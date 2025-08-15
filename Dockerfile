
FROM node:22

# 작업 디렉토리 설정
WORKDIR /app

# 네이티브 모듈 빌드를 위한 패키지 설치
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    pkg-config \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치 (모든 의존성 포함)
RUN npm ci

# 소스 코드 복사
COPY . .

# Next.js 애플리케이션 빌드
RUN npm run build

# 프로덕션 의존성만 남기기
RUN npm prune --production

# 포트 노출
EXPOSE 3001

# Next.js를 직접 3001 포트에서 실행
CMD ["npm", "start"]