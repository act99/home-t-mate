import React from "react";
import _ from "lodash";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";

const InfinityScroll = (props) => {
  const { children, callNext, loading } = props;
  const next = useSelector((state) => state.roomReducer.next);
  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      if (loading) {
        return;
      }
      if (next === true) {
        callNext();
      }
    }
  }, 300);
  const handleScroll = React.useCallback(_handleScroll, [loading]);
  React.useEffect(() => {
    if (loading) {
      return;
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <React.Fragment>
      {children}
      {loading && <Spinner />}
    </React.Fragment>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};

export default InfinityScroll;
