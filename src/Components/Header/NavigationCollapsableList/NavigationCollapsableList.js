import { Link } from 'react-router-dom';
import {
    List, ListItem, Typography, Collapse
} from '../../../mui-imports.js';

export default function NavigationCollapsableList(props) {
    return (
        <div className={props.className}>
            {props.collapsable
                ? <Collapse in={props.isOpen}>
                    <List className={props.listClassName}>
                        {props.items.map(item =>
                            props.itemsAreLinks
                                ? (
                                    <Link className='navigation-link-element' key={item} to={`/catalog?category=${item.toLowerCase().substring(0, item.length - 1)}`}>
                                        <ListItem button>
                                            <Typography variant={props.textFontSize}>{item}</Typography>
                                        </ListItem>
                                    </Link>
                                )
                                : (
                                    <ListItem button key={item}>
                                        <Typography variant={props.textFontSize}>{item}</Typography>
                                    </ListItem>)
                        )}
                    </List>
                </Collapse>
                : <List className={props.listClassName}>
                    {props.items.map(item =>
                        props.itemsAreLinks
                            ? (
                                <Link className='navigation-link-element' key={item} to={`/catalog?category=${item.toLowerCase().substring(0, item.length - 1)}`}>
                                    <ListItem button>
                                        <Typography variant={props.textFontSize}>{item}</Typography>
                                    </ListItem>
                                </Link>
                            )
                            : (
                                <ListItem button key={item}>
                                    <Typography variant={props.textFontSize}>{item}</Typography>
                                </ListItem>)
                    )}
                </List>
            }
        </div>
    );
}