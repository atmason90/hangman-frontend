export const SignupPage = () => {
    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        const { uname, pass, fname } = document.forms[0];

        fetch("http://ec2-54-82-112-252.compute-1.amazonaws.com:5000/login", {
            method: "post",
            body: {
                "username": uname.value,
                "password": pass.value,
                "full_name": fname.value
            }
        }).then(response => response.json()).then(data => {
            localStorage.setItem("username", data.username);
            localStorage.setItem("userid", data.UserId);
            localStorage.setItem("fullname", data.full_name);
        }).catch(err => console.error(err));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username </label>
                    <input type="text" name="uname" required />
                </div>
                <div>
                    <label>Password </label>
                    <input type="password" name="pass" required />
                </div>
                <div>
                    <label>Full Name </label>
                    <input type="text" name="fname" required />
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    );
}