$(document).ready(function () {

    $(".member-btn").click(function () {
        $("#member-container").fadeIn(300);
        $("#member-container").removeClass('d-none');
        $(".member-btn").addClass('border-bottom border-4');
        $(".request-btn").removeClass('border-bottom border-4');
        $(".search-btn").removeClass('border-bottom border-4');
        $("#request-container").addClass('d-none');
        $("#search-container").addClass('d-none');
    });

    $(".request-btn").click(function () {
        $("#request-container").fadeIn(300);
        $("#request-container").removeClass('d-none');
        $(".request-btn").addClass('border-bottom border-4');
        $(".member-btn").removeClass('border-bottom border-4');
        $(".search-btn").removeClass('border-bottom border-4');
        $("#member-container").addClass('d-none');
        $("#search-container").addClass('d-none');
    });

    $(".search-btn").click(function () {
        $("#search-container").fadeIn(300);
        $("#search-container").removeClass('d-none');
        $(".search-btn").addClass('border-bottom border-4');
        $(".member-btn").removeClass('border-bottom border-4');
        $(".request-btn").removeClass('border-bottom border-4');
        $("#request-container").addClass('d-none');
        $("#member-container").addClass('d-none');
    });

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
            if (data != false) {
                for (var i = 0; i < data.length; i++) {
                    $('#member-container').append(
                        '        <div class="row m-1 py-2 px-3 bg-white shadow-sm" style="border-radius: 1em;">' +
                        '            <div class="col">' +
                        '                <p class="mb-0 text-capitalize">' + data[i].firstName + ' ' + data[i].lastName + '</p>' +
                        '            </div>' +
                        '            <div class="col-auto">' +
                        '                <a href="#" class="remove-btn" id="' + data[i].userID + '"> <i class="fas fa-times fa-fw text-danger"></i></a>' +
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
            if (data != false) {
                for (var i = 0; i < data.length; i++) {
                    $('#request-container').append(
                        '        <div class="row m-1 py-2 px-3 bg-white shadow-sm" style="border-radius: 1em;">' +
                        '            <div class="col">' +
                        '                <p class="mb-0 text-capitalize">' + data[i].firstName + ' ' + data[i].lastName + '</p>' +
                        '            </div>' +
                        '            <div class="col-auto">' +
                        '                <a href="#" class="approve-btn me-2" id="' + data[i].userID + '"> <i class="fas fa-check fa-fw text-info"></i></a>' +
                        '                <a href="#" class="remove-btn" id="' + data[i].userID + '"> <i class="fas fa-times fa-fw text-danger"></i></a>' +
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

// Remove member/ member request
$(document).on('click', '.remove-btn',
    function () {

        // Remove member request list
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

        // Remove member request list
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