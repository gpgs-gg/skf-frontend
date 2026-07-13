import TwoSeaterSofaDisplay from "@/components/common/sofa-diagram/TwoSeaterSofaDisplay";
import OneSeaterSofaDisplay from "@/components/common/sofa-diagram/OneSeaterSofaDisplay";
import ThreeSeaterSofaDisplay from "@/components/common/sofa-diagram/ThreeSeaterSofaDisplay";
import FourSeaterSofaDisplay from "@/components/common/sofa-diagram/FourSeaterSofaDisplay";
import LeftLShapeSofaDisplay from "../../../components/common/sofa-diagram/LeftLshapeSofaDiagramDisplay";
import RightLShapeSofaDiagramDisplay from "../../../components/common/sofa-diagram/RightShapeSofaDiagramDisplay";
import UShapeSofaDiagramDisplay from "../../../components/common/sofa-diagram/UShapeSofaDiagramDisplay";
import SectionalModularSofaDiagramDisplay from "../../../components/common/sofa-diagram/SectionalModularSofaDiagramDisplay";
import CornerSofaDiagramDisplay from "../../../components/common/sofa-diagram/CornerSofaDiagramDisplay";
import SofaCumBedPullOutDiagramDisplay from "../../../components/common/sofa-diagram/SofaCumBedPullOutDiagramDisplay";
import SofaCumBedHydraulicDiagramDisplay from "../../../components/common/sofa-diagram/SofaCumBedHydraulicDiagramDisplay";
import ReclinerSofa1SeaterDiagramDisplay from "../../../components/common/sofa-diagram/ReclinerSofa1SeaterDiagramDisplay";
import ReclinerSofaDiagram3SeaterDisplay from "../../../components/common/sofa-diagram/ReclinerSofaDiagram3SeaterDisplay";
import ChaiseLoungeSofaDiagramDisplay from "../../../components/common/sofa-diagram/ChaiseLoungeSofaDiagramDisplay";
import DiwanSofaDiagramDisplay from "../../../components/common/sofa-diagram/DiwanSofaDiagramDisplay";
import OttomanDiagramDisplay from "../../../components/common/sofa-diagram/OttomanDiagramDisplay";
import BenchDiagramDisplay from "../../../components/common/sofa-diagram/BenchDiagramDisplay";
import RotatingChairs360DiagramDisplay from "../../../components/common/sofa-diagram/RotatingChairs360DiagramDisplay";
import FourSeaterSofaDiagram from "../../../components/common/sofa-diagram/FourSeaterSofaDiagram";
const SofaDiagramRenderer = ({ product }) => {
  switch (product.subCategory) {
    case "1-seater-sofas":
      return <OneSeaterSofaDisplay product={product} />;

    case "2-seater-sofas":
      return <TwoSeaterSofaDisplay product={product} />;

    case "3-seater-sofas":
      return <ThreeSeaterSofaDisplay product={product} />;

    // case "4-seater-sofas":
    //   return <FourSeaterSofaDiagram product={product} isView />;
    case "4-seater-sofas":
      return <FourSeaterSofaDisplay product={product} />;

    // Uncomment and update all other cases with control prop
    case "left-l-shape-sofas":
      return <LeftLShapeSofaDisplay product={product} />;

    case "right-l-shape-sofas":
      return <RightLShapeSofaDiagramDisplay product={product} />;

    case "u-shape-sofas":
      return <UShapeSofaDiagramDisplay product={product} />;

    case "sectional-sofas":
      return <SectionalModularSofaDiagramDisplay product={product} />;

    case "corner-sofas":
      return <CornerSofaDiagramDisplay product={product} />;

    case "sofa-cum-bed-pull-out":
      return <SofaCumBedPullOutDiagramDisplay product={product} />;

    case "sofa-cum-bed-fold-out":
      return <SofaCumBedPullOutDiagramDisplay product={product} />;

    case "storage-sofas":
      return <SofaCumBedHydraulicDiagramDisplay product={product} />;

    case "recliner-single":
      return <ReclinerSofa1SeaterDiagramDisplay product={product} />;

    case "recliner-sofas":
      return <ReclinerSofaDiagram3SeaterDisplay product={product} />;

    case "chaise-lounge":
      return <ChaiseLoungeSofaDiagramDisplay product={product} />;

    case "divan-daybed":
      return <DiwanSofaDiagramDisplay product={product} />;

    case "ottoman":
      return <OttomanDiagramDisplay product={product} />;

    case "bench-stool":
      return <BenchDiagramDisplay product={product} />;
    case "360-rotating-chairs":
      return <RotatingChairs360DiagramDisplay product={product} />;

    default:
      return null;
  }
};

export default SofaDiagramRenderer;
