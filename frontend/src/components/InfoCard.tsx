import { CSSProperties } from 'react';
import { FaSearch } from 'react-icons/fa'; 
import { cardStyle, countStyle, iconContainerBaseStyle, titleStyle } from './CSS-components';
interface DashboardCardProps {
  title: string;
  count: number;
  color?: 'red' | 'gray' | 'green';
}
const InfoCard=({ title, count, color = 'gray' }: DashboardCardProps)=> {
  let iconStyle: CSSProperties = { ...iconContainerBaseStyle };
  let iconColor: string = '#757575'; // ברירת מחדל - אפור
  if (color === 'red') {
    iconStyle = { ...iconStyle, backgroundColor: '#ffebee' };
    iconColor = '#f44336';
  } else if (color === 'green') {
    iconStyle = { ...iconStyle, backgroundColor: '#e8f5e9' };
    iconColor = '#4caf50';
  } else {
    iconStyle = { ...iconStyle, backgroundColor: '#eeeeee' };
  }
  return (
    <div style={cardStyle}>
      <div style={iconStyle}>
        <FaSearch size={16} color={iconColor} /> 
      </div>
      <div style={titleStyle}>{title}</div>
      <div style={countStyle}>{count}</div>
    </div>
  );
}
export default InfoCard;