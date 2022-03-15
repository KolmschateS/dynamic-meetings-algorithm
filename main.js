function setup()
{
  count = 0
  circleDiameter = 40
  minCircleDiameter = 2
  maxCircleDiameter = 160
  Points = [];
  PointsCache = [];
  createCanvas(windowWidth, windowHeight);
  minDistance = 9999999999;
  mainCircle = 0;
  mainCircleCache = 0;
}

function draw()
{
  if(mouseIsPressed == true)
    {
    col = IsColliding(mouseX, mouseY);
    if(col != false)
    {
      clear();

      col.x = mouseX;
      col.y = mouseY;
      
      CalculatePoints();
      CalculateSizes();
      DrawCircles();
      CalculateMinDistance();
      DrawDistances();
    }
  }
  checkForMainCircleChange();
}

function checkForMainCircleChange()
{
  if(mainCircleCache != mainCircle)
  {
    mainCircleCache = mainCircle;
    
    CalculatePoints();
    CalculateSizes();
    DrawCircles();
    CalculateMinDistance();
    DrawDistances();
  }
}

function mousePressed()
{
  x = mouseX;
  y = mouseY;
  col = IsColliding(x, y);
  if(col == false)
  {
    if(Points.length == mainCircle)
       {
    point = {x: x,
             y: y,
             dia: maxCircleDiameter,
             rad: circleDiameter/2,
            color: {
              r:random(255),
              g:random(255),
              b:random(255),
              a:random(255)
              }
            }
       }
    else
    {
    point = {x: x,
             y: y,
             dia: circleDiameter,
             rad: circleDiameter/2,
            color: {
              r:random(255),
              g:random(255),
              b:random(255),
              a:random(100, 255)
              }
            }
    }
    Points.push(point)
    count++;
  }
}

function DrawCircles()
{
  for(const i in Points)
  {
    // Draw the circle
    point = Points[i];
    strokeWeight(2);
    
    ellipse(point.x, point.y, point.dia);
    
   
    stroke(0);
    strokeWeight(0);
    textSize(18)
    textAlign(CENTER);
    text(i, point.x, point.y);
  }
}

function CalculatePoints()
{
      point = Points[mainCircle];
      for(const i in Points)
      {
        if(i != mainCircle){
          otherPoint = Points[i];
          strokeWeight(0.5);
          line(point.x, point.y, otherPoint.x, otherPoint.y)
        }
      }
}

function CalculateMinDistance()
{
  minDistance = 99999999;
  point = Points[mainCircle];
  for(const i in Points)
  {
    otherPoint = Points[i];
    diff = dist(point.x, point.y, otherPoint.x, otherPoint.y);
    if(diff != 0){
      if(diff < minDistance){minDistance = diff}
    }
  }
}

function CalculateBrightness(r, g, b, a)
{
  return (0.2126 * r) + (0.0722 * b) + (0.7152 * g);
}

function DrawDistance(px, py, p2x, p2y)
{
  volume = minDistance / dist(px, py, p2x, p2y);
  textPos = CalculateMiddleOfLine(px, py, p2x, p2y);
  if(Points.length > 1)
    {  
      stroke(0);
      strokeWeight(0);
      text(round(volume, 2), textPos.x, textPos.y);
    }
}

function DrawDistances()
{
    point = Points[mainCircle];
    for(const j in Points)
    {
      if(j != mainCircle)
        {
        otherPoint = Points[j];
        DrawDistance(point.x, point.y, otherPoint.x, otherPoint.y);
        }
    }
}

function CalculateMiddleOfLine(x1, y1, x2, y2)
{
  return {x: (x1 + x2) / 2, y: (y1 + y2) / 2}
}

function IsColliding(x,y)
{
  for(const i in Points)
  {
    point = Points[i];
    if(CircleCollisionDetection(point.x, point.y, point.rad, x, y, circleDiameter/2))
    {
      return point;
    }
  }
  return false;
}

function CircleCollisionDetection(px, py, pRad, p2x, p2y, p2Rad)
{
  if(sq(px - p2x) + sq(py - p2y) < sq(pRad + p2Rad))
  {
    return true;
  }
  return false;
}

function CalculateSizes()
{
  mainPoint = Points[mainCircle];
  mainPointMinDistance = CalculateMinDistanceFromPoint(mainPoint, mainCircle);
  for(const i in Points)
    {
      point = Points[i];
      if(i != mainCircle){
        volume = mainPointMinDistance / dist(mainPoint.x, mainPoint.y, point.x, point.y);
        size = CalculateSize(volume);
        point.dia = size;
      }
      else
      {
        point.dia = maxCircleDiameter;
      }
    }
}

function CalculateSize(volume)
{
  return minCircleDiameter + ((maxCircleDiameter - minCircleDiameter) * volume);
}

function CalculateMinDistanceFromPoint(point)
{
  minDistance = 999999999;
  
  for(const j in Points)
    {
      otherPoint = Points[j];
      if(j != mainCircle)
        {
          diff = dist(point.x, point.y, otherPoint.x, otherPoint.y);
          if(diff != 0){
            if(diff < minDistance){minDistance = diff}
          }
        }
    }
  return minDistance;
}