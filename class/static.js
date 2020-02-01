// Static成員指的是屬於類別的屬性或方法，也就是不論是哪一個被實體化的物件，都共享這個方法或屬性
class Student{
    constructor(name){
        this.name = name;
        Student._countStudent();
    }

    // 靜態方法定義
    static _countStudent(){
        if(this._numOfStudents === undefined){
            this._numOfStudents = 1;
        }else{
            this._numOfStudents ++;
        }
    }

    static get numOfStudents(){
        return this._numOfStudents;
    }
}

module.exports = Student;