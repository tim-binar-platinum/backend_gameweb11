      const submit = document.getElementById("play-button")
			const usernameInput = document.getElementById("username").value
			const passwordInput = document.getElementById("password").value
			console.log(usernameInput)
		

      submit.addEventListener('click', async () => {
        console.log("ini user",usernameInput)
        const token = axios.post('/verify', { 
					username: usernameInput,
					password: passwordInput
				})
				return await axios.get('/index', null, {
					headers: {'Authorization': 'Bearer '+token.data}
				}
				)
      })
		