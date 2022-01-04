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

    // Check for existing team
    if (token.teamID != null) {
        // Get team members list
        $.ajax({
            type: 'POST',
            url: url + "getTeam",
            data: {
                teamID: token.teamID
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {

                if (data[0] != false) {
                    for (var i = 0; i < data[0].length; i++) {
                        var buttons = '';
                        var owner = '';

                        if (data.userID == token.userID && token.userID != data[0][i].userID) {
                            buttons =
                                '<a href="#" class="remove-btn me-2" id="' + data[0][i].userID + '">' +
                                '<i class="fas fa-times fa-fw text-danger"></i></a>';
                        }

                        if (data.userID == data[0][i].userID) {
                            owner =
                                '<a href="#" class="me-2">' +
                                '<i class="fas fa-crown fa-fw text-warning"></i></a>';
                        }

                        $('#member-container').append(
                            '        <div class="row m-1 p-2 bg-white shadow-sm" style="border-radius: 1em;">' +
                            '            <div class="col">' +
                            '                <p class="mb-0 text-capitalize">' + data[0][i].firstName + ' ' + data[0][i].lastName + '</p>' +
                            '            </div>' +
                            '            <div class="col-auto">' +
                            owner +
                            buttons +
                            '            </div>' +
                            '        </div>'
                        );
                    }
                } else {
                    $('#member-container').append(
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
    } else {
        $('#member-container').append(
            '        <div class="row m-1 p-2" style="border-radius: 1em;">' +
            '            <div class="col text-center">' +
            '                <p class="text-white">Wait others to invite you to a team</p>' +
            '                <p class="text-white">or</p>' +
            '                <button class="btn btn-primary create-btn" style="border-radius: 1em;">Create a team</button>' +
            '            </div>' +
            '        </div>'
        );
    }

    // Get request members list
    $.ajax({
        type: 'POST',
        url: url + "getRequest",
        data: {
            teamID: token.teamID
        },
        dataType: 'JSON',
        beforeSend: function () {
            $('#progress-container').show();
        },
        success: function (data) {
            console.log(data);
            if (data[0] != false) {
                for (var i = 0; i < data[0].length; i++) {
                    var buttons = '';
                    var owner = '';

                    if (data.userID == token.userID) {
                        buttons =
                            '<a href="#" class="approve-btn me-2" id="' + data[0][i].userID + '">' +
                            '<i class="fas fa-check fa-fw text-info"></i></a>';
                        if (token.userID != data[0][i].userID) {
                            buttons +=
                                '<a href="#" class="remove-btn me-2" id="' + data[0][i].userID + '">' +
                                '<i class="fas fa-times fa-fw text-danger"></i></a>';
                        }
                    }

                    if (data.userID == data[0][i].userID) {
                        owner =
                            '<a href="#" class="me-2">' +
                            '<i class="fas fa-crown fa-fw text-warning"></i></a>';
                    }

                    $('#request-container').append(
                        '        <div class="row m-1 p-2 bg-white shadow-sm" style="border-radius: 1em;">' +
                        '            <div class="col">' +
                        '                <p class="mb-0 text-capitalize">' + data[0][i].firstName + ' ' + data[0][i].lastName + '</p>' +
                        '            </div>' +
                        '            <div class="col-auto">' +
                        owner +
                        buttons +
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

// Search member
$(document).on('keyup', '#search-input',
    function () {
        $.ajax({
            type: 'POST',
            url: url + "searchUser",
            data: {
                query: this.value
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {
                $('#search-display').html('');

                if (data != false) {
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

// Remove member/ member request
$(document).on('click', '.remove-btn',
    function () {
        $.ajax({
            type: 'POST',
            url: url + "removeMember",
            data: {
                userID: this.id
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {
                if (data != false) {
                    location.reload();
                } else {
                    alert('Failed to remove member.');
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

// Approve member request
$(document).on('click', '.approve-btn',
    function () {
        $.ajax({
            type: 'POST',
            url: url + "approveMember",
            data: {
                userID: this.id,
                teamID: token.teamID
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {
                if (data != false) {
                    location.reload();
                } else {
                    alert('Failed to approve member.');
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

// Add member
$(document).on('click', '.add-btn',
    function () {
        $.ajax({
            type: 'POST',
            url: url + "addMember",
            data: {
                userID: this.id,
                teamID: token.teamID
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {
                if (data != false) {
                    location.reload();
                } else {
                    alert('Failed to add member.');
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

// Create team
$(document).on('click', '.create-btn',
    function () {
        $.ajax({
            type: 'POST',
            url: url + "setTeam",
            data: {
                userID: token.userID
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {
                if (data != null) {
                    token.teamID = data;
                    localStorage.setItem('token', JSON.stringify(token));
                    location.reload();
                } else {
                    alert('Failed to create team.');
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