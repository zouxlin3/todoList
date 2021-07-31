import os
import platform
import click
import json
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user


app = Flask(__name__)
app.debug = True  # 调试模式开关
app.config['SECRET_KEY'] = os.urandom(24)

# 跨域支持
def after_request(resp):
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp
app.after_request(after_request)

pf = platform.system()  # 数据库配置
if pf == 'Windows':
    prefix = 'sqlite:///'
else:
    prefix = 'sqlite:////'
app.config['SQLALCHEMY_DATABASE_URI'] = prefix + os.path.join(app.root_path, 'data.db',)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

login_manager = LoginManager(app)


@login_manager.user_loader
def load_user(user_id):
    user = User.query.get(int(user_id))
    return user


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def validate_password(self, password):
        return check_password_hash(self.password_hash, password)


class Todo(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    content = db.Column(db.String(60))
    is_completed = db.Column(db.Boolean)

def temp_login():
    admin = User.query.filter(User.name == 'admin').first()
    login_user(admin)  # 全部登录admin


@app.route('/get_todos', methods=['GET'])
@login_required
def get_todos():
    temp_login()  # !

    res = {
        'todos': [],
    }

    todos = Todo.query.filter(Todo.user_id == current_user.id)

    for i in todos:
        res['todos'].append(todo2json(i))

    return jsonify(res), 200


@app.route('/get_name', methods=['GET'])
@login_required
def get_name():
    temp_login  # !

    res = {'name': current_user.name}

    return jsonify(res), 200


@app.route('/add', methods=['GET'])
@login_required
def add():
    temp_login()  # !

    content = request.args.get('content')
    todo = Todo(user=current_user.id, content=content, is_completed=False)
    db.session.add(todo)

    db.session.commit()

    todo = Todo.query.filter(Todo.content == content).first()
    
    return jsonify(todo2json(todo)), 200


@app.route('/delete', methods=['GET'])
@login_required
def delete():
    temp_login()  # !

    todo_id = request.args.get('id')
    db.session.delete(Todo.query.filter(Todo.id == todo_id).first())

    db.session.commit()
    return 200


@app.route('/complete', methods=['GET'])
@login_required
def complete():
    temp_login()  # !
    
    todo_id = request.args.get('id')
    todo = Todo.query.filter(Todo.id == todo_id).first()

    if todo.is_completed:
        todo.is_completed = False
    else:
        todo.is_completed = True

    db.session.commit()
    return 200

'''
@app.route('/login', methods=['GET'])
def login():
    name = request.args.get('name')
    password = request.args.get('password')

    user = User.query.filter(User.name == name).first()
    if user is None:
        return 'Not existed'
    else:
        if user.validate_password(password):
            login_user(user)
            return 200
        else:
            return 'Wrong password'


@app.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return 200


@app.route('/register', methods=['GET'])
def register():
    name = request.args.get('name')
    password = request.args.get('password')

    check_user = User.query.filter(User.name == name).first()
    if check_user is not None:
        return 'Existed'
    else:
        user = User(name=name)
        user.set_password(password)
        db.session.add(user)

        db.session.commit()
        return 200


@app.route('/reset_name', methods=['GET'])
@login_required
def reset_name():
    name = request.args.get('name')

    check_user = User.query.filter(User.name == name).first()
    if check_user is not None:
        return 'Existed'
    else:
        current_user.name = name

        db.session.commit()
        return 200


@app.route('/reset_password', methods=['GET'])
@login_required
def reset_password():
    password = request.args.get('password')
    current_user.set_password(password)

    db.session.commit()
    return 200
'''

def todo2json(todo):
    result = {
        'id': todo.id,
        'content': todo.content,
        'is_completed': todo.is_completed
    }

    return result

@app.cli.command('init')  # 注册为命令
def initdb():  # 初始化数据库
    db.drop_all()
    db.create_all()

    admin = User(name='admin')
    admin.set_password('admin')
    db.session.add(admin)

    todo1 = Todo(user_id=1, content='test1', is_completed=False)
    todo2 = Todo(user_id=1, content='test2', is_completed=False)
    db.session.add(todo1)
    db.session.add(todo2)

    db.session.commit()

    click.echo('Initialized database.')


if __name__ == '__main__':
    app.run()
