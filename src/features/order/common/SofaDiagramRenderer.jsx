import OneSeaterSofaDiagram from "@/components/common/sofa-diagram/OneSeaterSofaDiagram";
import TwoSeaterSofaDiagram from "@/components/common/sofa-diagram/TwoSeaterSofaDiagram";
import ThreeSeaterSofaDiagram from "@/components/common/sofa-diagram/ThreeSeaterSofaDiagram";
import FourSeaterSofaDiagram from "@/components/common/sofa-diagram/FourSeaterSofaDiagram";
import LeftLShapeSofaDiagram from "@/components/common/sofa-diagram/LeftLShapeSofaDiagram";
import RightLShapeSofaDiagram from "@/components/common/sofa-diagram/RightLShapeSofaDiagram ";
import UShapeSofaDiagram from "@/components/common/sofa-diagram/UShapeSofaDiagram";
import SectionalModularSofaDiagram from "@/components/common/sofa-diagram/SectionalModularSofaDiagram";
import CornerSofaDiagram from "@/components/common/sofa-diagram/CornerSofaDiagram";
import SofaCumBedPullOutDiagram from "@/components/common/sofa-diagram/SofaCumBedPullOutDiagram";
import SofaCumBedHydraulicDiagram from "@/components/common/sofa-diagram/SofaCumBedHydraulicDiagram";
import ReclinerSofa1SeaterDiagram from "@/components/common/sofa-diagram/ReclinerSofa1SeaterDiagram";
import ReclinerSofaDiagram3Seater from "@/components/common/sofa-diagram/ReclinerSofaDiagram3Seater";
import ChaiseLoungeSofaDiagram from "@/components/common/sofa-diagram/ChaiseLoungeSofaDiagram";
import DiwanSofaDiagram from "@/components/common/sofa-diagram/DiwanSofaDiagram";
import OttomanDiagram from "@/components/common/sofa-diagram/OttomanDiagram";
import BenchDiagram from "@/components/common/sofa-diagram/BenchDiagram";
import RotatingChairs360Diagram from "@/components/common/sofa-diagram/RotatingChairs360Diagram";

const SofaDiagramRenderer = ({ product }) => {
  switch (product.subCategory) {
    case "1-seater-sofas":
      return <OneSeaterSofaDiagram product={product} isView />;

    case "2-seater-sofas":
      return <TwoSeaterSofaDiagram product={product} isView />;

    case "3-seater-sofas":
      return <ThreeSeaterSofaDiagram product={product} isView />;

    case "4-seater-sofas":
      return <FourSeaterSofaDiagram product={product} isView />;

    case "left-l-shape-sofas":
      return <LeftLShapeSofaDiagram product={product} isView />;

    case "right-l-shape-sofas":
      return <RightLShapeSofaDiagram product={product} isView />;

    case "u-shape-sofas":
      return <UShapeSofaDiagram product={product} isView />;

    case "sectional-sofas":
      return <SectionalModularSofaDiagram product={product} isView />;

    case "corner-sofas":
      return <CornerSofaDiagram product={product} isView />;

    case "sofa-cum-bed-pull-out":
      return <SofaCumBedPullOutDiagram product={product} isView />;

    case "sofa-cum-bed-fold-out":
      return <SofaCumBedPullOutDiagram product={product} isView />;

    case "storage-sofas":
      return <SofaCumBedHydraulicDiagram product={product} isView />;

    case "recliner-single":
      return <ReclinerSofa1SeaterDiagram product={product} isView />;

    case "recliner-sofas":
      return <ReclinerSofaDiagram3Seater product={product} isView />;

    case "chaise-lounge":
      return <ChaiseLoungeSofaDiagram product={product} isView />;

    case "divan-daybed":
      return <DiwanSofaDiagram product={product} isView />;

    case "ottoman":
      return <OttomanDiagram product={product} isView />;

    case "bench-stool":
      return <BenchDiagram product={product} isView />;

    case "360-rotating-chairs":
      return <RotatingChairs360Diagram product={product} isView />;

    default:
      return null;
  }
};

export default SofaDiagramRenderer;

// import TwoSeaterSofaDisplay from "@/components/common/sofa-diagram/TwoSeaterSofaDisplay";
// import OneSeaterSofaDisplay from "@/components/common/sofa-diagram/OneSeaterSofaDisplay";
// import ThreeSeaterSofaDisplay from "@/components/common/sofa-diagram/ThreeSeaterSofaDisplay";
// import FourSeaterSofaDisplay from "@/components/common/sofa-diagram/FourSeaterSofaDisplay";
// import LeftLShapeSofaDisplay from "../../../components/common/sofa-diagram/LeftLshapeSofaDiagramDisplay";
// import RightLShapeSofaDiagramDisplay from "../../../components/common/sofa-diagram/RightShapeSofaDiagramDisplay";
// import UShapeSofaDiagramDisplay from "../../../components/common/sofa-diagram/UShapeSofaDiagramDisplay";
// import SectionalModularSofaDiagramDisplay from "../../../components/common/sofa-diagram/SectionalModularSofaDiagramDisplay";
// import CornerSofaDiagramDisplay from "../../../components/common/sofa-diagram/CornerSofaDiagramDisplay";
// import SofaCumBedPullOutDiagramDisplay from "../../../components/common/sofa-diagram/SofaCumBedPullOutDiagramDisplay";
// import SofaCumBedHydraulicDiagramDisplay from "../../../components/common/sofa-diagram/SofaCumBedHydraulicDiagramDisplay";
// import ReclinerSofa1SeaterDiagramDisplay from "../../../components/common/sofa-diagram/ReclinerSofa1SeaterDiagramDisplay";
// import ReclinerSofaDiagram3SeaterDisplay from "../../../components/common/sofa-diagram/ReclinerSofaDiagram3SeaterDisplay";
// import ChaiseLoungeSofaDiagramDisplay from "../../../components/common/sofa-diagram/ChaiseLoungeSofaDiagramDisplay";
// import DiwanSofaDiagramDisplay from "../../../components/common/sofa-diagram/DiwanSofaDiagramDisplay";
// import OttomanDiagramDisplay from "../../../components/common/sofa-diagram/OttomanDiagramDisplay";
// import BenchDiagramDisplay from "../../../components/common/sofa-diagram/BenchDiagramDisplay";
// import RotatingChairs360DiagramDisplay from "../../../components/common/sofa-diagram/RotatingChairs360DiagramDisplay";
// import FourSeaterSofaDiagram from "../../../components/common/sofa-diagram/FourSeaterSofaDiagram";
// import OneSeaterSofaDiagram from "../../../components/common/sofa-diagram/OneSeaterSofaDiagram";
// import TwoSeaterSofaDiagram from "../../../components/common/sofa-diagram/TwoSeaterSofaDiagram";
// const SofaDiagramRenderer = ({ product }) => {
//   switch (product.subCategory) {
//     case "1-seater-sofas":
//       return <OneSeaterSofaDiagram product={product} isView />;
//     // case "1-seater-sofas":
//     //   return <OneSeaterSofaDisplay product={product} />;

//     case "2-seater-sofas":
//       return <TwoSeaterSofaDiagram product={product} isView />;
//     // case "2-seater-sofas":
//     //   return <TwoSeaterSofaDisplay product={product} />;

//     case "3-seater-sofas":
//       return <ThreeSeaterSofaDisplay product={product} />;

//     // case "4-seater-sofas":
//     //   return <FourSeaterSofaDiagram product={product} isView />;
//     case "4-seater-sofas":
//       return <FourSeaterSofaDisplay product={product} />;

//     // Uncomment and update all other cases with control prop
//     case "left-l-shape-sofas":
//       return <LeftLShapeSofaDisplay product={product} />;

//     case "right-l-shape-sofas":
//       return <RightLShapeSofaDiagramDisplay product={product} />;

//     case "u-shape-sofas":
//       return <UShapeSofaDiagramDisplay product={product} />;

//     case "sectional-sofas":
//       return <SectionalModularSofaDiagramDisplay product={product} />;

//     case "corner-sofas":
//       return <CornerSofaDiagramDisplay product={product} />;

//     case "sofa-cum-bed-pull-out":
//       return <SofaCumBedPullOutDiagramDisplay product={product} />;

//     case "sofa-cum-bed-fold-out":
//       return <SofaCumBedPullOutDiagramDisplay product={product} />;

//     case "storage-sofas":
//       return <SofaCumBedHydraulicDiagramDisplay product={product} />;

//     case "recliner-single":
//       return <ReclinerSofa1SeaterDiagramDisplay product={product} />;

//     case "recliner-sofas":
//       return <ReclinerSofaDiagram3SeaterDisplay product={product} />;

//     case "chaise-lounge":
//       return <ChaiseLoungeSofaDiagramDisplay product={product} />;

//     case "divan-daybed":
//       return <DiwanSofaDiagramDisplay product={product} />;

//     case "ottoman":
//       return <OttomanDiagramDisplay product={product} />;

//     case "bench-stool":
//       return <BenchDiagramDisplay product={product} />;
//     case "360-rotating-chairs":
//       return <RotatingChairs360DiagramDisplay product={product} />;

//     default:
//       return null;
//   }
// };

// export default SofaDiagramRenderer;
