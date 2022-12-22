    if(location.pathname === '/signup'){
        const signupForm = document.querySelector('form.signupForm');
        const emailError = document.querySelector('.email.error');
        const passError = document.querySelector('.password.error');

        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // reset errors

            
            emailError.textContent = ' ';
            passError.textContent = ' ';

            // get the values
            
            const email = signupForm.email.value;
            const password = signupForm.password.value;
            const name = signupForm.name.value;

            
            try {

                const res = await fetch('/signup', {
                    method: 'POST',
                    body: JSON.stringify({ email, password, name}),
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await res.json();
                console.log(data);
                if(data.errors){
                    // console.log('errors at login.js : ', data.errors);
                    emailError.textContent = data.errors.email;
                    passError.textContent = data.errors.password;
                }
                if(data.user){
                    location.assign('/');
                }
                
            } catch (err) {
                console.log(err);
                
            }

            

            // reset signupForm
            // signupForm.reset();

        })
    }