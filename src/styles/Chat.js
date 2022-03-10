"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Avatar = _interopRequireDefault(require("@material-ui/core/Avatar"));

var _Typography = _interopRequireDefault(
  require("@material-ui/core/Typography")
);

var _withStyles = _interopRequireDefault(
  require("@material-ui/core/styles/withStyles")
);

var _default2 = _interopRequireDefault(
  require("@mui-treasury/styles/chatMsg/default")
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

var ChatMsg = (0, _withStyles["default"])(_default2["default"], {
  name: "ChatMsg",
})(function (props) {
  var classes = props.classes,
    avatar = props.avatar,
    messages = props.messages,
    side = props.side,
    GridContainerProps = props.GridContainerProps,
    GridItemProps = props.GridItemProps,
    AvatarProps = props.AvatarProps,
    getTypographyProps = props.getTypographyProps;

  var attachClass = function attachClass(index) {
    if (index === 0) {
      return classes["".concat(side, "First")];
    }

    if (index === messages.length - 1) {
      return classes["".concat(side, "Last")];
    }

    return "";
  };

  return /*#__PURE__*/ _react["default"].createElement(
    _Grid["default"],
    _extends(
      {
        container: true,
        spacing: 2,
        justifyContent: side === "right" ? "flex-end" : "flex-start",
      },
      GridContainerProps
    ),
    side === "left" &&
      /*#__PURE__*/ _react["default"].createElement(
        _Grid["default"],
        _extends(
          {
            item: true,
          },
          GridItemProps
        ),
        /*#__PURE__*/ _react["default"].createElement(
          _Avatar["default"],
          _extends(
            {
              src: avatar,
            },
            AvatarProps,
            {
              className: (0, _clsx["default"])(
                classes.avatar,
                AvatarProps.className
              ),
            }
          )
        )
      ),
    /*#__PURE__*/ _react["default"].createElement(
      _Grid["default"],
      {
        item: true,
        xs: 8,
      },
      messages.map(function (msg, i) {
        var TypographyProps = getTypographyProps(msg, i, props);
        return (
          /*#__PURE__*/
          // eslint-disable-next-line react/no-array-index-key
          _react["default"].createElement(
            "div",
            {
              key: msg.id || i,
              className: classes["".concat(side, "Row")],
            },
            /*#__PURE__*/ _react["default"].createElement(
              _Typography["default"],
              _extends(
                {
                  align: "left",
                },
                TypographyProps,
                {
                  className: (0, _clsx["default"])(
                    classes.msg,
                    classes[side],
                    attachClass(i),
                    TypographyProps.className
                  ),
                }
              ),
              msg
            )
          )
        );
      })
    )
  );
});
ChatMsg.propTypes = {
  avatar: _propTypes["default"].string,
  messages: _propTypes["default"].arrayOf(_propTypes["default"].string),
  side: _propTypes["default"].oneOf(["left", "right"]),
  GridContainerProps: _propTypes["default"].shape({}),
  GridItemProps: _propTypes["default"].shape({}),
  AvatarProps: _propTypes["default"].shape({}),
  getTypographyProps: _propTypes["default"].func,
};
ChatMsg.defaultProps = {
  avatar: "",
  messages: [],
  side: "left",
  GridContainerProps: {},
  GridItemProps: {},
  AvatarProps: {},
  getTypographyProps: function getTypographyProps() {
    return {};
  },
};
var _default = ChatMsg;
exports["default"] = _default;
