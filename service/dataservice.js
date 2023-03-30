const jwt = require('jsonwebtoken')
const db = require('./db')

// userDetails = {
//     1000: { acno: 1000, username: "anu", password: "abc123", balance: 0, transaction: [] },
//     1001: { acno: 1001, username: "amal", password: "abc123", balance: 0, transaction: [] },
//     1003: { acno: 1003, username: "arun", password: "abc123", balance: 0, transaction: [] },
//     1004: { acno: 1004, username: "akil", password: "abc123", balance: 0, transaction: [] },

// }




register = (acno, uname, psw) => {
    // if (acno in userDetails) {
    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                status: false,
                message: 'already exists',
                statusCode: 401
            }
        }
        else {
            //create a new user obj in db
            const newUser = new db.User({
                acno, username: uname, password: psw, balance: 0, transaction: []
            })
            //save in db
            newUser.save()
            return {
                status: true,
                message: 'register success',
                statusCode: 200
            }

        }
    })

}

login = (acno, psw) => {

    // if (acno in userDetails) {
    return db.User.findOne({ acno, password: psw }).then(user => {
        if (user) {
            currentUser = user.username
            currentAcno = acno;

            const token = jwt.sign({ currentAcno }, "supersecretkey123")

            return {
                status: true,
                message: 'login success',
                statusCode: 200, currentUser, currentAcno, token
            };
        } else {
            return {
                status: false,
                message: 'incorrect acno or  pass',
                statusCode: 401
            };
        }
    })
}
// if (psw == userDetails[acno]["password"]) {
// currenUser = userDetails[acno]["username"]
// currentAcno = acno;
// // console.log(this.currenUser);

// const token = jwt.sign({ currentAcno }, "supersecretkey123")

// return {
//     status: true,
//     message: 'login success',
//     statusCode: 200, currenUser, currentAcno, token
// };
//         } else {
//             return {
//                 status: false,
//                 message: 'incorrect pass',
//                 statusCode: 401
//             };
//         }
//     } else {
//         return {
//             status: false,
//             message: 'not registered',
//             statusCode: 401
//         };
//     }
// }

deposit = (acno, password, amount) => {
    var amt = parseInt(amount)
    // if (acno in userDetails) {
    return db.User.findOne({ acno, password }).then(user => {
        if (user) {
            user.balance += amt
            user.transaction.push({ Type: "Credit", Amount: amt, Balance: user.balance })
            user.save()
            return {
                status: true,
                message: `${amt} is credited your account and balance is ${user.balance}`,
                statusCode: 200
            };
        } else {
            return {
                status: false,
                message: 'incorrect acno or password',
                statusCode: 401
            };
        }
    })
}
//         if (password == userDetails[acno]["password"]) {
//             userDetails[acno]["balance"] += amt;
//             // console.log(userDetails[acno]["balance"]);


//             userDetails[acno]["transaction"].push({ Type: "Credit", Amount: amt, Balance: userDetails[acno]["balance"] })

//             return {
//                 status: true,
//                 message: `${amt} is credited your account and balance is ${userDetails[acno]["balance"]}`,
//                 statusCode: 200
//             };

//         } else {
//             return {
//                 status: false,
//                 message: 'incorrect pass',
//                 statusCode: 401
//             };
//         }
//     } else {
//         return {
//             status: false,
//             message: 'not registered',
//             statusCode: 401
//         };
//     }
// }
withdraw = (acno, password, amount) => {
    var amt = parseInt(amount)
    // if (acno in userDetails) {
    return db.User.findOne({ acno, password }).then(user => {
        if (user) {
            if (amt <= user.balance) {
                user.balance -= amt
                user.transaction.push({ Type: "Debit", Amount: amt, Balance: user.balance })
                user.save()
                return {
                    status: true,
                    message: `${amt} is debited from your account and balance is ${user.balance}`,
                    statusCode: 200
                };
            } else {
                return {
                    status: false,
                    message: 'insufficient balance',
                    statusCode: 401
                }
            }
        } else {
            return {
                status: false,
                message: 'incorect acno or pass',
                statusCode: 401
            };
        }
    })
}
//         if (password == userDetails[acno]["password"]) {
//             if (amt <= userDetails[acno]["balance"]) {
//                 userDetails[acno]["balance"] -= amt;

//                 userDetails[acno]["transaction"].push({ Type: "Debit", Amount: amt, Balance: userDetails[acno]["balance"] })




//                 return {
//                     status: true,
//                     message: `${amt} is debited from your account and balance is ${userDetails[acno]["balance"]}`,
//                     statusCode: 200
//                 };
//             } else {
//                 return {
//                     status: false,
//                     message: 'insufficient balance',
//                     statusCode: 401
//                 };
//             }
//         } else {
//             return {
//                 status: false,
//                 message: 'incorect pass',
//                 statusCode: 401
//             };
//         }
//     } else {
//         return {
//             status: false,
//             message: 'not registered',
//             statusCode: 401
//         };
//     }

// }

getTransaction = acno => {
    return db.User.findOne({ acno }).then(user => {
        if (user)
            return {
                status: true,
                transaction: user.transaction,
                statusCode: 200
            };
    })



}

deleteAcc = (acno) => {
    return db.User.deleteOne({ acno }).then(user => {
        if (user) {
            return {
                status: true,
                statusCode: 200,
                message: "account deleted"
            }
        } else {
            return {
                status: false,
                statusCode: 401,
                message: "account not found"
            }
        }
    })
}

module.exports = {
    register, login, deposit, withdraw, getTransaction,deleteAcc

}