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


@app.route('/get_todos', methods=['GET'])
# @login_required
def get_todos():
    admin = User.query.filter(User.name == 'admin').first()
    login_user(admin)  # 登录admin

    res = {
        'todos': [],
    }

    todos = Todo.query.filter(Todo.user_id == current_user.id)

    for i in todos:
        res['todos'].append({
            'id': i.id,
            'content': i.content,
            'is_completed': i.is_completed
        })

    return jsonify(res), 200


@app.route('/get_name', methods=['GET'])
def get_name():
    admin = User.query.filter(User.name == 'admin').first()
    login_user(admin)  # 登录admin

    res = {'name': current_user.name}

    return jsonify(res), 200


@app.route('/add', methods=['GET'])
# @login_required
def add():
    req = json.loads(request.get_data())
    todo = Todo(user=current_user.id, content=req['content'], is_completed=False)
    db.session.add(todo)

    db.session.commit()
    return 200


@app.route('/delete', methods=['GET'])
# @login_required
def delete():
    req = json.loads(request.get_data())
    db.session.delete(Todo.query.filter(Todo.id == req['id']).first())

    db.session.commit()
    return 200


@app.route('/complete', methods=['GET'])
# @login_required
def complete():
    req = json.loads(request.get_data())
    todo = Todo.query.filter(Todo.id == req['id']).first()

    if todo.is_completed:
        todo.is_completed = False
    else:
        todo.is_completed = True

    db.session.commit()
    return 200

'''
@app.route('/login', methods=['GET'])
def login():
    req = json.loads(request.get_data())
    name = req['name']
    password = req['password']

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
    req = json.loads(request.get_data())
    name = req['name']
    password = req['password']

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
    req = json.loads(request.get_data())
    name = req['name']

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
    req = json.loads(request.get_data())
    password = req['password']
    current_user.set_password(password)

    db.session.commit()
    return 200
'''

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
