if(location.pathname === '/login'){

    const form = document.querySelector('form.loginForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = form.email.value;
        const password = form.password.value;

        try {
            
            const res = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            const data = await res.json();
                console.log(data);
                if(data.errors){
                    console.log('errors at login.js : ', data.errors);
                }
                if(data.user){
                    location.assign('/');
                }

        } catch (err) {
            console.log(err);
            
        }
    })
}