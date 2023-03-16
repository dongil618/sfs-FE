import styles from '../asset/Header.module.css';
import { Link } from "react-router-dom";

export default function Header(props) {

    const lis = props.menu_list.map((menu) => <li key={menu.id}><Link to={menu.link}>{menu.title}</Link></li>);

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img src="/image/sfs_logo.png" className="sfs-logo" alt="sfs 로고입니다." />
            </div>
            <div className={styles.header_menu}>
                {lis}
            </div>
        </div>
    );
}