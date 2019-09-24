export class User {
    userId: number;
    emailID: string;
    nickname: string;
    imageUrl: string;
    sessionToken: string;
    role: string;
    authDomain: string;
    firstName: string;
    lastName: string;
    fullName: string;

    constructor(
        userId: number,
        emailID: string,
        nickname: string,
        imageUrl: string,
        sessionToken: string,
        role: string,
        authDomain: string,
        firstName: string,
        lastName: string,
        fullName: string
    ) {
        this.userId = userId;
        this.emailID = emailID;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
        this.sessionToken = sessionToken;
        this.role = role;
        this.authDomain = authDomain;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
    }
}
