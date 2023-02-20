import React from "react";
import styles from './Panel.module.scss'

const Panel = (props: any) => {

    const left = React.Children.map(props.children, child => child.type.displayName === 'Left' ? child : null);
    const right = React.Children.map(props.children, child => child.type.displayName === 'Right' ? child : null);

    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <div className={styles.left}>
                    {left}
                </div>
                <div className={styles.right}>
                    {right}
                </div>
            </div>
        </div>
    )
}

const left = (props: any) => props.children;
left.displayName = 'Left';
Panel.left = left;

const right = (props: any) => props.children;
right.displayName = 'Right';
Panel.right = right;


export default Panel;