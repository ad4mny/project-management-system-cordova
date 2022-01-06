$(document).ready(function () {
    $('#fullname').html(token.firstName + " " + token.lastName);
    $('#username').html("@" + token.username);

    $('#usernameInput').val(token.username);
    $('#firstNameInput').val(token.firstName);
    $('#lastNameInput').val(token.lastName);

    $(".update-btn").click(function () {
        $("#main-container").slideUp(300, function () {
            $("#main-container").addClass('d-none');
            $("#update-container").fadeIn(300);
            $("#update-container").removeClass('d-none');
        });
    });

    $(".back-btn").click(function () {
        $("#update-container").slideUp(300, function () {
            $("#update-container").addClass('d-none');
            $("#main-container").fadeIn(300);
            $("#main-container").removeClass('d-none');

        });
    });

    // Update profile 
    $(document).on('submit', '#update-form',
        function (e) {

            e.preventDefault();
            var formData = new FormData(this);
            formData.append('userID', token.userID);

            $.ajax({
                type: 'POST',
                url: url + 'updateProfile',
                data: formData,
                processData: false,
                contentType: false,
                dataType: 'JSON',
                beforeSend: function () {
                    $('#progress-container').show();
                },
                success: function (data) {

                    if (Array.isArray(data)) {
                        alert('Successfully updated your profile.');
                        token.firstName = data[0];
                        token.lastName = data[1];
                        token.username = data[2];
                        localStorage.setItem('token', JSON.stringify(token));
                        location.reload();
                    } else {
                        alert(data);
                    }
                },
                error: function () {
                    $('#notice-container').html(
                        '<small class="text-danger fw-light">' +
                        '<i class="fas fa-exclamation-triangle me-1 fa-fw"></i>500: Internal Server Error.' +
                        '</small>'
                    );
                },
                complete: function () {
                    $('#progress-container').hide();
                }
            });

        }
    );

});