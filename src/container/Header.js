import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Button,
    Badge
} from 'reactstrap';

class Header extends Component {
    handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        localStorage.removeItem("username")
        localStorage.removeItem("role")
        window.location.reload('/')
    };
    render() {
        var role
        //role
        if (localStorage.getItem("role") === 'Teacher') {
            role = <Badge color="info" style={{ marginRight: 10 }}>教師</Badge>
        }
        else if (localStorage.getItem("role") === 'Admin') {
            role = <Badge color="info" style={{ marginRight: 10 }}>管理者</Badge>
        }
        else role = <Badge color="info" style={{ marginRight: 10 }}>学習者</Badge>


        if (localStorage.getItem("token") === null) {
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">kitkatsupa</NavbarBrand>
                        <NavbarToggler />
                        <Collapse navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">コース</NavLink>
                                </NavItem>
                            </Nav>
                            <NavbarText><Button onClick={() => this.props.history.push("/auth/sign-in")} color="primary">サインイン</Button></NavbarText>
                            <NavbarText><Link to={`/auth/sign-up`}><Button color="secondary" style={{ marginLeft: 10 }}>サインアップ</Button></Link></NavbarText>
                        </Collapse>
                    </Navbar>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">kitkatsupa</NavbarBrand>
                        <NavbarToggler />
                        <Collapse navbar>
                            <Nav className="mr-auto" navbar>
                                {/* {localStorage.getItem("role") === "Student" || localStorage.getItem("role") === "Teacher" ? */}
                                < NavItem >
                                        <NavLink href="/">コース</NavLink>
                                    </NavItem>
                                    {/* : null */}
                                {/* } */}

                                {
                                    localStorage.getItem("role") === "Admin" ?
                                        <NavItem>
                                            <NavLink href="/users-list">ユーザ管理</NavLink>
                                        </NavItem>
                                        : null
                                }

                                {localStorage.getItem("role") === "Teacher" ?
                                    <NavItem>
                                        <NavLink href="/achievement">成績評価</NavLink>
                                    </NavItem>
                                    : null
                                }
                            </Nav>
                            <NavbarText>{role}</NavbarText>
                            <NavbarText>こんにちは、{localStorage.getItem("username")}さん</NavbarText>
                            <NavbarText><Button color="danger" style={{ marginLeft: 10 }} onClick={this.handleLogout}>サインアウト</Button></NavbarText>
                            <NavbarText><Link to={`/profile`}><Button color="secondary" style={{ marginLeft: 10 }}>プロフィール</Button></Link></NavbarText>
                        </Collapse>
                    </Navbar>
                </div >
            )
        }
    }
}

export default withRouter(Header);
