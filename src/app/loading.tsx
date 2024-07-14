const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="wrapper flex justify-center items-center">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
        </div>      
      </div>    
    </div>
  );
};

export default Loading;
