import styles from '../asset/Header.module.css';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';

export default function Header(props) {

    const lis = props.menu_list.map((menu) => <li key={menu.id}><Link to={menu.link}>{menu.title}</Link></li>);

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to={"/"}>
                    <img src="/image/sfs_logo.png" className="sfs-logo" alt="sfs 로고입니다." />
                </Link>
            </div>
            <div className={styles.header_menu}>
                {lis}
            </div>
            <div>
                <Link to={"/login"}>
                    <Button
                        id="login"
                        variant="outlined"
                        style={{
                            height: "35px",
                            width: "70px",
                            margin: "0 5px",
                        }}
                    >로그인</Button>
                </Link>
                <Link to={"/signup"}>
                    <Button
                        id="sign-up"
                        variant="contained"
                        style={{
                            height: "35px",
                            width: "70px",
                            margin: "0 5px"
                        }}
                    >회원가입</Button>
                </Link>
            </div>
        </div>
    );
}