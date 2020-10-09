const view = {
    Start: () => {
        const signUp = document.querySelector('.btn_signup');
        if (signUp) {
            signUp.addEventListener('click', () => {
                const account = controller.getAccount_signUp()
                console.log(account)
                if (controller.checkAccount_signUp(account) == true) {
                    controller.directional('../pages/login.html')
                }
            })
        }
        const login = document.querySelector('.btn_login');
        if (login) {
            login.addEventListener('click', () => {
                const account = controller.getAccount_login();
                console.log(account);
                if (controller.checkAccount_login(account) == true) {
                    controller.directional('../home.html')
                    // console.log('check')
                    // console.log(id + user)
                }
            })
        }
        const postForm = document.getElementById('post_form')
        if (postForm) {
            //console.log(postList.length)
            postForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const post = controller.getPost();
                post.id_cate = controller.checkCategory(post);
                console.log(post.id__user);
                // console.log('check')
                // console.log(id)
                model.addPost(post);
                controller.directional("../home.html")


            })
        }
        const reloadF = document.querySelector('#fashion');
        if (reloadF) {
            reloadF.addEventListener('click', () => {
                if(controller.renderList() !== false){let id_cate = controller.checkCate("fashion")
                for (let i = 0; i < postList.length; i++) {
                    if (id_cate == postForm[i].id_cate) {
                        addRecordList('./pages/single_page.html', postList[i].Img, postList[i].title)
                    }
                }}
            })
        }

    },


    showMessage: (className, message) => {
        let mess = document.querySelector(className);
        mess.textContent = message

    }

}
const controller = {
    getAccount_signUp: () => {
        let checkExist = model.updateListAccount();
        console.log(checkExist)
        if (checkExist != null) {
            accountList = checkExist;
        }
        console.log(accountList)
        return account = {
            id_account: accountList.length,
            userName: document.querySelector('.add_username').value,
            password: document.querySelector('.add_password').value,
            email: document.querySelector('.add_email').value,
            dateOfBirth: document.querySelector('.add_date').value,
            gender: document.querySelector('.add_gender').value,
        }
    },
    checkAccount_signUp: (account) => {
        if (account.userName === '') {
            view.showMessage('#username_alert', 'Please input username');
        } else {
            view.showMessage('#username_alert', '')
        } if (account.password === '') {
            view.showMessage('#password_alert', 'Please input password');
        } else {
            view.showMessage('#password_alert', '');
        } if (account.userName !== '' && account.password !== '') {
            if (model.checkAccount(account) === true) {
                model.addAccount(account);
            }
            return true;
        }
    },
    directional: function (link) {
        location.assign(link);
    },
    getAccount_login: () => {
        let checkExist = model.updateListAccount();
        if (checkExist != null) {
            accountList = checkExist;
        }
        console.log(accountList);
        return account = {
            userName: document.querySelector('.value_username').value,
            password: document.querySelector('.value_password').value,
        }
    },
    checkAccount_login: (account) => {
        if (account.userName !== '' && account.password !== '') {
            if (model.checkLogin(account) == true) {
                return true;
            }
        }
    },
    getPost: () => {
        let checkExist = model.updateListPost();
        if (checkExist != null) {
            postList = checkExist;
        }
        const postForm = document.getElementById('post_form');
        return post = {
            id_post: postList.length,
            title: postForm.title.value,
            category: postForm.category.value,
            content: postForm.content.value,
            Img: postForm.fileupload.value,
            id__user: JSON.parse(localStorage.getItem('id_user')),
        }
    },
    checkCategory: (post) => {
        let n = 0;
        for (let i = 0; i < category.length; i++) {
            if (post.category == category[i].name) {
                n = i
            }
        }
        return n;
    },
    checkCate: (name) => {
        let n = 0;
        for (let i = 0; i < category.length; i++) {
            if (name == category[i].name) {
                n = i
            }
        }
        return n;
    },
    addRecordList: (single_page, urlImg, title) => {
        let raw = `<li>
            <div class="media wow fadeInDown">
                <a href="./single_page.html" class="media-left"> 
                <img alt="" src="../images/Sean-Wotherspoon-.jpg"> </a>
                <div class="media-body"> <a href="./single_page.html" class="catg_title">Sean Wotherspoon x adidas Originals Superstar SUPEREARTH – Sức mạnh của sự sáng tạo</a> </div>
            </div>
            </li>`
        raw = raw.replace('./single_page.html', single_page);
        raw = raw.replace('../images/Sean-Wotherspoon-.jpg', urlImg);
        raw = raw.replace('Sean Wotherspoon x adidas Originals Superstar SUPEREARTH – Sức mạnh của sự sáng tạo', title);

        const ulList = document.querySelector('.spost_nav');
        ulList.insertAdjacentHTML('beforebegin', raw)

    },
    renderList: () => {
        let checkExist = model.updateListPost();
        if (checkExist != null) {
            postList = checkExist;
        }
        return false;
    }

}
const model = {

    updateListAccount: () => {
        return JSON.parse(localStorage.getItem('account'));
    },
    updateListPost: () => {
        return JSON.parse(localStorage.getItem('post'));
    },
    addAccount: (account) => {
        accountList.push(account);
        //console.log(accountList);
        localStorage.setItem('account', JSON.stringify(accountList))

    },
    addPost: (post) => {
        postList.push(post);
        localStorage.setItem('post', JSON.stringify(postList));
    },

    checkAccount: (account) => {
        //let List = JSON.parse(localStorage.getItem('account'));
        //console.log(List)
        let count = 0;
        for (let i = 0; i < accountList.length; i++) {
            if (account.userName == accountList[i].userName) {
                break;
            }
            count++;
        }
        if (count != accountList.length) {
            alert('Account is exist')
            return false;
        }
        alert('SignUp successful!!!')
        return true
    },
    checkLogin: (account) => {
        let count = 0;
        for (let i = 0; i < accountList.length; i++) {
            if (account.userName === accountList[i].userName && account.password === accountList[i].password) {
                let id = accountList[i].id_account;
                let user = accountList[i].userName;
                localStorage.setItem('id_user', JSON.stringify(id));
                localStorage.setItem('user', user);
                break;
            }
            count++;
        }
        if (count !== accountList.length) {
            alert('Login successful !!!');

            return true;
        }
        alert('Account is not exist or the password is wrong :(');
        return false;
    }
}
view.Start();
let accountList = [];
let postList = [];
let category = [{ id: 0, name: 'cultule' }, { id: 1, name: 'business' }, { id: 2, name: 'fashion' }, { id: 3, name: 'creative' }, { id: 4, name: 'technology' }, { id: 5, name: 'photograph' }]



