# Используем базовый образ с Node.js
FROM node:20

# Устанавливаем рабочую директорию для сервера
WORKDIR /app/server

# Копируем package.json и package-lock.json для сервера
COPY server/package*.json ./

# Устанавливаем зависимости для сервера
RUN npm install

# Копируем остальные файлы сервера
COPY server/. .

# Устанавливаем рабочую директорию для клиента
WORKDIR /app/front

# Копируем package.json и package-lock.json для клиента
COPY front/package*.json ./

# Устанавливаем зависимости для клиента
RUN npm install

# Копируем остальные файлы клиента
COPY front/. .

# Собираем фронтенд
RUN npm run build

# Устанавливаем рабочую директорию обратно на сервер
WORKDIR /app/server

# Указываем порт, который будет использоваться
EXPOSE 3005

# Запускаем сервер
CMD ["npm", "start"]