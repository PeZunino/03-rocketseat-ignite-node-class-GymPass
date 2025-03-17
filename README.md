# 03-GymPass

## RFs (Requisitos funcionais)
- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [X] Deve ser possível obter um número de check-ins realizado pelo usuário logado 
- [x] Deve ser possível o usuário obter seu histórico de check-ins
- [x] Deve ser possível o usuário buscar academias próximas (até 10km)
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [x] Deve ser possível validar o chech-in de um usuário
- [x] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio)
- [x] O usuário não deve poder se cadastrar com um e-mail duplicado (é validação, mas é imprensidível)
- [x] O usuário não pode fazer 2 check-ins no mesmo dia (prática comum no meio para que o usúario não frequente dois espaços diferentes no mesmo dia)
- [x] O usuário não pode fazer chech-in se não estiver perto (100m) da academia
- [x] O check-in só pode ser validado até 20 minutos após criado. 
- [x] O chech-in só pode ser validado por administradores
- [x] A academia só pode ser cadastrada por administradores

## RFs (Requisitos não-funcionais)
- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)
