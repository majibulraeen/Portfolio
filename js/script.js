document.getElementById("contact-form")
.addEventListener("submit", function(event){

    event.preventDefault();

    let form = this;

    // Form validation
    let name = form.name.value.trim();
    let email = form.email.value.trim();
    let subject = form.subject.value.trim();
    let message = form.message.value.trim();

    // Validate name
    if (name === "") {
        alert("Please enter your name");
        form.name.focus();
        return;
    }

    // Validate email format
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        form.email.focus();
        return;
    }

    // Block disposable/temporary email domains
    let disposableDomains = [
        'tempmail.com', 'guerrillamail.com', 'mailinator.com', '10minutemail.com',
        'throwawaymail.com', 'yopmail.com', 'sharklasers.com', 'getairmail.com',
        'temp-mail.org', 'fakeinbox.com', 'maildrop.cc', 'tempmail.net',
        'mytemp.email', 'temp-mail.ru', 'mailtemp.com', 'tempmail.de'
    ];
    
    let emailDomain = email.split('@')[1].toLowerCase();
    if (disposableDomains.includes(emailDomain)) {
        alert("Please use a real email address. Temporary emails are not allowed.");
        form.email.focus();
        return;
    }

    // Validate subject
    if (subject === "") {
        alert("Please enter a subject");
        form.subject.focus();
        return;
    }

    // Validate message
    if (message === "") {
        alert("Please enter your message");
        form.message.focus();
        return;
    }

    // 1. Send email to Majibul (Admin notification)
    emailjs.sendForm(
        "service_45vin0n",
        "template_mbh8uyu",
        form
    )
    .then(function(){

        // 2. Send automatic reply to visitor
        emailjs.sendForm(
            "service_45vin0n",
            "template_s48dj7p",
            form
        )
        .then(function(){

            alert("Message sent successfully!");

            form.reset();

        })
        .catch(function(error){

            alert("Message received, but auto reply failed: "
            + JSON.stringify(error));

        });


    })
    .catch(function(error){

        alert("Failed to send message: "
        + JSON.stringify(error));

    });

});