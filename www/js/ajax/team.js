$(document).ready(function () {

    $(".member-btn").click(function () {
        $("#member-container").fadeIn(300);
        $("#member-container").removeClass('d-none');
        $(".member-btn").addClass('border-bottom border-3');
        $(".request-btn").removeClass('border-bottom border-3');
        $(".search-btn").removeClass('border-bottom border-3');
        $("#request-container").addClass('d-none');
        $("#search-container").addClass('d-none');
    });

    $(".request-btn").click(function () {
        $("#request-container").fadeIn(300);
        $("#request-container").removeClass('d-none');
        $(".request-btn").addClass('border-bottom border-3');
        $(".member-btn").removeClass('border-bottom border-3');
        $(".search-btn").removeClass('border-bottom border-3');
        $("#member-container").addClass('d-none');
        $("#search-container").addClass('d-none');
    });

    $(".search-btn").click(function () {
        $("#search-container").fadeIn(300);
        $("#search-container").removeClass('d-none');
        $(".search-btn").addClass('border-bottom border-3');
        $(".member-btn").removeClass('border-bottom border-3');
        $(".request-btn").removeClass('border-bottom border-3');
        $("#request-container").addClass('d-none');
        $("#member-container").addClass('d-none');
    });

    // Get friends list
    $.ajax({
        type: 'POST',
        url: url + "getFriendList",
        data: {
            userID: token.userID
        },
        dataType: 'JSON',
        beforeSend: function () {
            $('#progress-container').show();
        },
        success: function (data) {

            if (
                Array.isArray(data) &&
                data.length > 0 &&
                data != false
            ) {
                for (var i = 0; i < data.length; i++) {

                    var buttons = '';

                    if (token.userID != data[i].userID) {
                        buttons =
                            '<a href="#" class="remove-btn me-2" id="' + data[i].userID + '">' +
                            '<i class="fas fa-times fa-fw text-danger"></i></a>';
                    }

                    $('#member-display').append(
                        '        <div class="row m-1 p-2 bg-white shadow-sm" style="border-radius: 1em;">' +
                        '            <div class="col">' +
                        '                <p class="mb-0 text-capitalize">' + data[i].firstName + ' ' + data[i].lastName + '</p>' +
                        '            </div>' +
                        '            <div class="col-auto">' +
                        buttons +
                        '            </div>' +
                        '        </div>'
                    );

                }
            } else {
                $('#member-display').append(
                    '        <div class="row m-1 py-2 px-3 bg-white shadow-sm" style="border-radius: 1em;">' +
                    '            <div class="col text-center">' +
                    '                <p class="mb-0">No member in the team yet.</p>' +
                    '            </div>' +
                    '        </div>'
                );
            }
        },
        error: function () {
            $('#notice-container').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#progress-container').hide();
        }
    });

    // Get friend request list
    $.ajax({
        type: 'POST',
        url: url + "getFriendRequest",
        data: {
            userID: token.userID
        },
        dataType: 'JSON',
        beforeSend: function () {
            $('#progress-container').show();
        },
        success: function (data) {

            if (
                Array.isArray(data) &&
                data.length > 0 &&
                data != false
            ) {
                for (var i = 0; i < data.length; i++) {

                    $('#request-container').append(
                        '        <div class="row m-1 p-2 bg-white shadow-sm" style="border-radius: 1em;">' +
                        '            <div class="col">' +
                        '                <p class="mb-0 text-capitalize">' + data[i].firstName + ' ' + data[i].lastName + '</p>' +
                        '            </div>' +
                        '            <div class="col-auto">' +
                        '               <a href="#" class="approve-btn me-2" id="' + data[i].userID + '">' +
                        '                   <i class="fas fa-check fa-fw text-info"></i></a>' +
                        '               <a href="#" class="remove-btn me-2" id="' + data[i].userID + '">' +
                        '                   <i class="fas fa-times fa-fw text-danger"></i></a>' +
                        '            </div>' +
                        '        </div>'
                    );
                }
            } else {
                $('#request-container').append(
                    '        <div class="row m-1 py-2 px-3 bg-white shadow-sm" style="border-radius: 1em;">' +
                    '            <div class="col text-center">' +
                    '                <p class="mb-0">No new member request.</p>' +
                    '            </div>' +
                    '        </div>'
                );
            }
        },
        error: function () {
            $('#notice-container').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#progress-container').hide();
        }
    });

});

// Search friend
$(document).on('keyup', '#search-input',
    function () {
        $.ajax({
            type: 'POST',
            url: url + "searchUser",
            data: {
                userID: token.userID,
                query: this.value
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {

                $('#search-display').html('');

                if (
                    Array.isArray(data) &&
                    data.length > 0 &&
                    data != false
                ) {
                    for (var i = 0; i < data.length; i++) {
                        $('#search-display').append(
                            '        <div class="row m-1 py-2 px-3 bg-white shadow-sm" style="border-radius: 1em;">' +
                            '            <div class="col">' +
                            '                <p class="mb-0 text-capitalize">' + data[i].firstName + ' ' + data[i].lastName + '</p>' +
                            '            </div>' +
                            '            <div class="col-auto">' +
                            '                <a href="#" class="add-btn me-2" id="' + data[i].userID + '"> <i class="fas fa-plus fa-fw text-primary"></i></a>' +
                            '            </div>' +
                            '        </div>'
                        );
                    }
                } else {
                    $('#search-display').append(
                        '        <div class="row m-1 py-2 px-3 bg-white shadow-sm" style="border-radius: 1em;">' +
                        '            <div class="col text-center">' +
                        '                <p class="mb-0">No user found.</p>' +
                        '            </div>' +
                        '        </div>'
                    );
                }
            },
            error: function () {
                $('#notice-container').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
            },
            complete: function () {
                $('#progress-container').hide();
            }

        });
    }
);

// Remove friend / friend request
$(document).on('click', '.remove-btn',
    function () {
        $.ajax({
            type: 'POST',
            url: url + "removeFriend",
            data: {
                userID: token.userID,
                friendID: this.id
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {
                if (data != false) {
                    alert('Request/friend has been removed.');
                    location.reload();
                } else {
                    alert('Failed to remove friend.');
                }
            },
            error: function () {
                $('#notice-container').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
            },
            complete: function () {
                $('#progress-container').hide();
            }
        });
    }
);

// Add friend request
$(document).on('click', '.add-btn',
    function () {
        $.ajax({
            type: 'POST',
            url: url + "addFriend",
            data: {
                userID: token.userID,
                friendID: this.id
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {
                if (data != false) {
                    alert('Success adding a friend.');
                    location.reload();
                } else {
                    alert('Failed to add friend or you have a pending friend request.');
                }
            },
            error: function () {
                $('#notice-container').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
            },
            complete: function () {
                $('#progress-container').hide();
            }
        });
    }
);

// Approve friend request
$(document).on('click', '.approve-btn',
    function () {
        $.ajax({
            type: 'POST',
            url: url + "approveFriend",
            data: {
                userID: token.userID,
                friendID: this.id
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {
                if (data != false) {
                    alert('Success adding a friend.');
                    location.reload();
                } else {
                    alert('Failed to add friend.');
                }
            },
            error: function () {
                $('#notice-container').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
            },
            complete: function () {
                $('#progress-container').hide();
            }
        });
    }
);
