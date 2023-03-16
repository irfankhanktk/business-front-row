import React from "react";
import { ScrollView, SafeAreaView, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Bg } from "../../assets/images";
import ImagePlaceholder from "../../components/atoms/Placeholder";
import Row from "../../components/atoms/row";
import { CustomHeader } from "../../components/molecules/header/header-1x";
import HeadingTitle from "../../components/molecules/heading-title";
import Bold from "../../presentation/typography/bold-text";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import { Styles as styles } from "./styles";
import ServiceOffering from "./../../components/service-offering/index";
import CouponPromo from "./../../components/coupon-promo/index";
import { CarWash } from "../../assets/common-icons";
const about =
  "Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years.Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years  continuing the outstanding level of service Triad area residents expect from our";

const ServiceDetails = (props) => {
  const { route, navigation } = props;
  const [isMoreBtn, setIsMoreBtn] = React.useState(true);

  return (
    <SafeAreaView style={styles.conntainer}>
      <CustomHeader allowBackBtn title={"Car Wash"} colors={colors} />
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: mvs(22) }}>
          <Row style={{ paddingHorizontal: mvs(22) }}>
            <View
              style={{
                height: mvs(80),
                width: mvs(80),
                borderRadius: mvs(15),
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 0.5,
                borderColor: colors.GDFDFDF,
              }}
            >
              {/* <ImagePlaceholder borderRadius={mvs(15)} uri={Bg} style={{ width: mvs(51), height: mvs(51) }} /> */}
              <CarWash width={mvs(51)} height={mvs(51)} />
            </View>
            <View style={{ marginLeft: mvs(13), flex: 1 }}>
              <Bold numberOfLines={2} size={mvs(18)} label={"Car Wash"} />
              <Row justifyContent="flex-start" alignItems="center">
                <Regular color={colors.B606060} label={"Lead Time:"} />
                <Medium color={colors.G3CB971} label={" 45-60 Minutes"} />
              </Row>
              <Row
                style={{ marginTop: mvs(2) }}
                justifyContent="flex-start"
                alignItems="center"
              >
                <Regular color={colors.B606060} label={"Price:"} />
                <Medium color={colors.primary} label={" AED 45-60"} />
              </Row>
            </View>
          </Row>
          <HeadingTitle title="About Service" />
          <View style={{ paddingHorizontal: mvs(18) }}>
            <Regular
              numberOfLines={null}
              label={
                about?.length > 185 && isMoreBtn
                  ? `${about?.slice(0, 183)} ...`
                  : about
              }
              size={mvs(16)}
              color={colors.B1E1E1E}
            />
            {isMoreBtn && about?.length > 185 && (
              <TouchableOpacity onPress={() => setIsMoreBtn(false)}>
                <Regular color={colors.primary} label={"Read More"} />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              backgroundColor: colors.FBF8F8,
              flexGrow: 1,
              paddingBottom: mvs(30),
            }}
          >
            <ServiceOffering moveTo="ServiceOfferingDetails" />
            <CouponPromo />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  home_categories: store.state.home_categories,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchHomePosts: (user_id, page) => DIVIY_API.fetchHomePosts(user_id, page),
};
export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetails);
