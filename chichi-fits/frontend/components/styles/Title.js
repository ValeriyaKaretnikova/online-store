import styled from 'styled-components';

const Title = styled.h4`
  margin: 0 1rem;
  text-align: center;
  transform: skew(-5deg) rotate(-1deg);
  margin-top: -2.5rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: var(--magenta);
    display: inline;
    line-height: 1.3;
    font-size: 2.5rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
  }
`;

export default Title;
