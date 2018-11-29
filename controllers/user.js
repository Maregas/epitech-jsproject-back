const mUser = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User {
    constructor(email, password, nickname) {
        if (arguments.length > 0) {
            this.email = email;
            this.password = password;
            if (arguments.length === 3) {
                this.nickname = nickname;
                this.hash = "";
            }
        }
    }

    async genToken(account, secret) {
        const result = await bcrypt.compare(this.password, account.password);
        if (result) {
            const token = await jwt.sign(account, secret, {
                expiresIn: '24h' // expires in 24 hours
            });
            return {
                auth: true,
                id: account.id,
                email: account.email,
                nickname: account.nickname,
                token: token,
                tokenType: "Bearer"
            };
        } else {
            return {
                auth: false,
                error: "PASSWORD",
                text: "Password doesn't match"
            };
        }
    }

    async hashpass(password) {
        const salt = await bcrypt.genSalt(10);
        this.hash = await bcrypt.hash(password, salt);
        return {
            hashed: true,
            hash: this.hash
        };
    }

    async create() {
        let res;
        try {
            let account = await mUser.create({
                nickname: this.nickname,
                email: this.email,
                password: this.hash
            });
            res = {
                created: true,
                id: account.dataValues.id,
                email: account.dataValues.email,
            }
        } catch (err) {
            let error = err.errors[0];
            res = {
                created: false,
                error: error.type,
                text: error.message
            };
        }
        return res;
    }

    async auth(secret) {
        let res = {
            auth: false,
            error: "invalid_grant",
            text: "Missing parameter in the query"
        };
        let account = await mUser.find({
            where: {
                email: this.email
            }
        });
        if (account) {
            account = {
                id: account.dataValues.id,
                email: account.dataValues.email,
                nickname: account.dataValues.nickname,
                password: account.dataValues.password
            };
            await this.setStatus(account.id, true);
            res = await this.genToken(account, secret);
        } else {
            res = {
                auth: false,
                error: "USER",
                text: "User not found"
            };
        }
        return res;
    }

    async setStatus(userId, active) {
      const payload = { isActive: active };
      await mUser.update(payload, {
        where: {
          id: userId
        }
      });
      return { edited: true };
    }

    async edit(body, userId) {
        const payload = {};
        if (body.email) {
            payload.email = body.email;
        }
        if (body.nickname) {
            payload.nickname = body.nickname
        }
        if (body.npassword && body.password) {
            const user = await mUser.find({
                where: {
                    id: userId
                }
            });

            const isok = await bcrypt.compare(body.password, user.dataValues.password);
            if (isok) {
                let hash = await this.hashpass(body.npassword);
                payload.password = hash.hash;
            } else {
                return {
                    edited: false,
                    error: "PASSWORD",
                    text: "Passwords does not match."
                }
            }
        } else if (body.npassword && !body.password) {
            return {
                edited: false,
                error: "PASSWORD",
                text: "You need to provide a the current password to edit it."
            }
        }
        if (Object.keys(payload).length !== 0 && payload.constructor === Object) {
            await mUser.update(payload, {
                where: {
                    id: userId
                }
            });
            return {
                edited: true,
            }
        } else {
            return {
                edited: false,
                error: "PARAMETERS",
                text: "You need to provide parameters"
            }
        }
    }

    async delete(userId) {
        await mUser.destroy({
            where: {
                id: userId
            }
        });
        return {
            deleted: true
        }
    }

    async find(userId) {
      const user = await mUser.find({
        where: {
          id: userId
        }
      });

      return user;
    }
}
module.exports = User;
