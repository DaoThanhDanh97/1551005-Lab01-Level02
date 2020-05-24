import React from "react";
import "../App.css";
import { Point, AppState } from "../redux/reducer";
import { useSelector } from "react-redux";
import { styles } from "../styles/styles";

const Map = ({ children }: any) => {
  const mapData = useSelector((state: AppState) => state.mapPoints);
  const m = useSelector((state: AppState) => state.mValue);
  const n = useSelector((state: AppState) => state.nValue);

  const renderWallByType = (type: string) => {
    switch (type) {
      case "zero":
        return (
          <div style={styles.item}>
            <div style={styles.zero} />
          </div>
        );
      case "oneLeft":
        return (
          <div style={styles.item}>
            <div style={styles.oneLeft} />
          </div>
        );
      case "oneRight":
        return (
          <div style={styles.item}>
            <div style={styles.oneRight} />
          </div>
        );
      case "oneTop":
        return (
          <div style={styles.item}>
            <div style={styles.oneTop} />
          </div>
        );
      case "oneBottom":
        return (
          <div style={styles.item}>
            <div style={styles.oneBottom} />
          </div>
        );
      case "twoHorizontal":
        return (
          <div style={styles.item}>
            <div style={styles.twoHorizontal} />
          </div>
        );
      case "twoVertical":
        return (
          <div style={styles.item}>
            <div style={styles.twoVertical} />
          </div>
        );
      case "twoTopLeft":
        return (
          <div style={styles.item}>
            <div style={styles.twoTopLeft}>
              <div style={styles.twoTopLeftInner} />
            </div>
          </div>
        );
      case "twoTopRight":
        return (
          <div style={styles.item}>
            <div style={styles.twoTopRight}>
              <div style={styles.twoTopRightInner} />
            </div>
          </div>
        );
      case "twoBottomLeft":
        return (
          <div style={styles.item}>
            <div style={styles.twoBottomLeft}>
              <div style={styles.twoBottomLeftInner} />
            </div>
          </div>
        );
      case "twoBottomRight":
        return (
          <div style={styles.item}>
            <div style={styles.twoBottomRight}>
              <div style={styles.twoBottomRightInner} />
            </div>
          </div>
        );
      case "threeTop":
        return (
          <div style={styles.item}>
            <div style={styles.threeTop}>
              <div style={styles.threeTopInnerLeft} />
              <div style={styles.threeTopInnerRight} />
            </div>
          </div>
        );
      case "threeBottom":
        return (
          <div style={styles.item}>
            <div style={styles.threeBottom}>
              <div style={styles.threeBottomInnerLeft} />
              <div style={styles.threeBottomInnerRight} />
            </div>
          </div>
        );
      case "threeLeft":
        return (
          <div style={styles.item}>
            <div style={styles.threeLeft}>
              <div style={styles.threeLeftInnerTop} />
              <div style={styles.threeLeftInnerBottom} />
            </div>
          </div>
        );
      case "threeRight":
        return (
          <div style={styles.item}>
            <div style={styles.threeRight}>
              <div style={styles.threeRightInnerTop} />
              <div style={styles.threeRightInnerBottom} />
            </div>
          </div>
        );
      case "four":
        return (
          <div style={styles.item}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ ...styles.threeTop, borderBottomWidth: 0 }}>
                <div style={styles.threeTopInnerLeft} />
                <div style={styles.threeTopInnerRight} />
              </div>
              <div style={{ ...styles.threeBottom, borderTopWidth: 0 }}>
                <div style={styles.threeBottomInnerLeft} />
                <div style={styles.threeBottomInnerRight} />
              </div>
            </div>
          </div>
        );
      default:
        return <div></div>;
    }
  };

  const getWallType = (adjacents: Point[], x: number, y: number) => {
    const adjWalls = adjacents.filter((item) => item.value === 1);
    const adjWallNumber = adjWalls.length;
    if (adjWallNumber === 0) {
      return renderWallByType("zero");
    } else if (adjWallNumber === 1) {
      const wall = adjWalls[0];
      if (wall.x === x - 1) return renderWallByType("oneBottom");
      else if (wall.x === x + 1) return renderWallByType("oneTop");
      else if (wall.y === y - 1) return renderWallByType("oneRight");
      else if (wall.y === y + 1) return renderWallByType("oneLeft");
    } else if (adjWallNumber === 2) {
      const wall1 = adjWalls[0];
      const wall2 = adjWalls[1];
      if (wall1.x === wall2.x) return renderWallByType("twoHorizontal");
      else if (wall1.y === wall2.y) return renderWallByType("twoVertical");
      else if (wall1.x < wall2.x && wall1.y > wall2.y)
        return renderWallByType("twoTopLeft");
      else if (wall1.x < wall2.x && wall1.y < wall2.y)
        return renderWallByType("twoTopRight");
      else if (wall1.x > wall2.x && wall1.y > wall2.y)
        return renderWallByType("twoBottomLeft");
      else if (wall1.x > wall2.x && wall1.y < wall2.y)
        return renderWallByType("twoBottomRight");
    } else if (adjWallNumber === 3) {
      if (adjWalls[0].y === adjWalls[1].y) {
        const type = adjWalls[2].y < adjWalls[0].y ? "threeLeft" : "threeRight";
        return renderWallByType(type);
      }
      if (adjWalls[2].x === adjWalls[1].x) {
        const type = adjWalls[2].x < adjWalls[0].x ? "threeBottom" : "threeTop";
        return renderWallByType(type);
      }
    } else if (adjWallNumber === 4) {
      return renderWallByType("four");
    }
  };

  const renderWall = (x: number, y: number) => {
    if (x === 0 || x === n - 1 || y === 0 || y === m - 1) {
      const adjacents = [];
      if (x > 0) adjacents.push(mapData[x - 1][y]);
      if (x < n - 1) adjacents.push(mapData[x + 1][y]);
      if (y > 0) adjacents.push(mapData[x][y - 1]);
      if (y < m - 1) adjacents.push(mapData[x][y + 1]);
      return getWallType(adjacents, x, y);
    } else {
      const adjacents = [
        mapData[x - 1][y],
        mapData[x + 1][y],
        mapData[x][y - 1],
        mapData[x][y + 1],
      ];
      return getWallType(adjacents, x, y);
    }
  };

  const renderItem = (item: Point) => {
    return item.value === 1 ? (
      renderWall(item.x, item.y)
    ) : (
      <div style={styles.item}></div>
    );
  };

  const renderChildren = () => children;

  return (
    <div style={{ marginLeft: 16 }} className={"map"}>
      {mapData.map((array: Point[]) => {
        return (
          <div className="row">
            {array.map((item: Point) => renderItem(item))}
          </div>
        );
      })}
      {renderChildren()}
    </div>
  );
};

export default Map;
